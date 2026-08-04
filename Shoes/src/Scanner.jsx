import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import "./Scanner.css";
import { FaTimes, FaCamera } from "react-icons/fa";

// Reads a `upi://pay?pa=...&pn=...&am=...` string into its parts.
// Returns null if the scanned code isn't a UPI payment link.
export function parseUpiString(data) {
  if (!data || typeof data !== "string") return null;
  if (!data.toLowerCase().startsWith("upi://")) return null;

  const queryIndex = data.indexOf("?");
  if (queryIndex === -1) return null;

  const params = new URLSearchParams(data.slice(queryIndex + 1));
  const pa = params.get("pa");
  if (!pa) return null;

  return {
    pa,
    pn: params.get("pn") || "",
    am: params.get("am") || "",
  };
}

function Scanner({ onDetected, onClose, title = "Scan UPI QR Code", hint = "Point your camera at a UPI QR code" }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const frameRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera access isn't supported in this browser.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          tick();
        }
      } catch (err) {
        setError(
          "Couldn't access the camera. Allow camera permissions and make sure the site is served over HTTPS."
        );
      }
    }

    function tick() {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code && code.data) {
        onDetected(code.data);
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    }

    startCamera();

    return () => {
      cancelled = true;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [onDetected]);

  return (
    <div className="scannerOverlay" onClick={(e) => e.stopPropagation()}>
      <div className="scannerModal">
        <FaTimes className="scannerClose" onClick={onClose} />

        <h3>
          <FaCamera /> {title}
        </h3>

        {error ? (
          <p className="scannerError">{error}</p>
        ) : (
          <>
            <div className="scannerFrame">
              <video ref={videoRef} muted playsInline />
              <div className="scanBox" />
            </div>
            <p className="scannerHint">{hint}</p>
          </>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}

export default Scanner;
