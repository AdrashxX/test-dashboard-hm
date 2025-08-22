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
      let testName = file.replace(".html", "");

      if (file.includes("__")) {
        const parts = file.split("__");
        subject = parts[0];
        testName = parts[1].replace(".html", "");
      } else if (file.includes("_Test_")) {
        const parts = file.split("_Test_");
        subject = parts[0] + "_Test";
        testName = parts[1].replace(".html", "");
      } else {
        const idx = file.lastIndexOf("_");
        if (idx !== -1) {
          subject = file.substring(0, idx);
          testName = file.substring(idx + 1).replace(".html", "");
        }
      }

      if (!subjects[subject]) subjects[subject] = [];
      subjects[subject].push({ file, testName });
    }
  });

  return { props: { subjects } };
}

export default function Home({ subjects }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState({});

  const toggle = (subject) => {
    setOpen((prev) => ({ ...prev, [subject]: !prev[subject] }));
  };

  const highlight = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const filteredSubjects = Object.fromEntries(
    Object.entries(subjects).map(([subject, tests]) => [
      subject,
      tests.filter((t) =>
        (t.testName + subject).toLowerCase().includes(query.toLowerCase())
      ),
    ]).filter(([_, tests]) => tests.length > 0)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pharmacy Test Dashboard</h1>

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
            <button
              onClick={() => toggle(subject)}
              className="flex justify-between items-center w-full"
            >
              <h2 className="text-lg font-semibold">
                {subject} ({filteredSubjects[subject].length} tests)
              </h2>
              <span>{open[subject] ? "▲" : "▼"}</span>
            </button>

            {open[subject] && (
              <ul className="list-disc ml-6 mt-2 space-y-1">
                {filteredSubjects[subject].map((test) => (
                  <li key={test.file}>
                    <a
                      href={`/viewer?file=${encodeURIComponent(test.file)}`}
                      className="text-blue-600 hover:underline"
                      dangerouslySetInnerHTML={{
                        __html: highlight(test.testName),
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
