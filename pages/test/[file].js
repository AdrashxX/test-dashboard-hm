import { useRouter } from "next/router";

export default function TestPage() {
  const router = useRouter();
  const { file } = router.query;

  if (!file) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <a href="/" className="text-blue-600 underline">← Back to Dashboard</a>
      <h1 className="text-2xl font-bold my-4">{file}</h1>
      <iframe
        src={`/tests/${file}`}
        style={{ width: "100%", height: "90vh", border: "none" }}
      ></iframe>
    </div>
  );
}