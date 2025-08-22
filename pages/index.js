import fs from "fs";
import path from "path";
import { useState } from "react";

export async function getStaticProps() {
  const testsDir = path.join(process.cwd(), "public/tests");
  const files = fs.readdirSync(testsDir);

  const subjects = {};
  files.forEach((file) => {
    if (file.endsWith(".html")) {
      let subject = "Others";
      if (file.includes("__")) {
        subject = file.split("__")[0];
      }
      if (!subjects[subject]) subjects[subject] = [];
      subjects[subject].push(file);
    }
  });

  return { props: { subjects } };
}

export default function Home({ subjects }) {
  const [query, setQuery] = useState("");

  // Filter subjects/tests based on search query
  const filteredSubjects = Object.fromEntries(
    Object.entries(subjects).map(([subject, tests]) => [
      subject,
      tests.filter((test) => test.toLowerCase().includes(query.toLowerCase()))
    ]).filter(([_, tests]) => tests.length > 0)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pharmacy Test Dashboard</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search tests..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 p-2 border rounded w-full md:w-1/2"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(filteredSubjects).map((subject) => (
          <div key={subject} className="bg-white rounded-2xl shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">
              {subject} ({filteredSubjects[subject].length} tests)
            </h2>
            <ul className="list-disc ml-6">
              {filteredSubjects[subject].map((file) => (
                <li key={file}>
                  <a
                    href={`/test/${encodeURIComponent(file)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {file}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}