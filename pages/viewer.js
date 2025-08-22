import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Viewer() {
  const router = useRouter();
  const { file } = router.query;
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    if (file) {
      setFilePath(`/tests/${file}`);
    }
  }, [file]);

  if (!file) {
    return <p className="p-6">No test selected.</p>;
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <button
        onClick={() => router.push("/")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-xl font-bold mb-4">{file.replace(".html", "")}</h1>

      <iframe
        src={filePath}
        className="w-full h-[85vh] border rounded-lg shadow"
        title="Test Viewer"
      />
    </div>
  );
}
