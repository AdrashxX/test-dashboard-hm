import { useRouter } from "next/router";

export default function Viewer() {
  const router = useRouter();
  const { file } = router.query;

  if (!file) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen dark:text-gray-100">
      <a href="/" className="text-blue-600 dark:text-blue-400 underline">← Back to Dashboard</a>
      <h1 className="text-2xl font-bold my-4">{file}</h1>
      <iframe
        src={`/tests/${file}`}
        className="w-full h-[90vh] border rounded-lg shadow"
      ></iframe>
    </div>
  );
}