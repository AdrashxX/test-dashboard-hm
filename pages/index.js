import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const tests = {
    "AIIMS CRE 2025 Pharmacist Mock Test Series": [
      "AIIMS_CRE_2023_PHARM(1).html",
      "AIIMS_CRE_2023_PHARM.html",
      "AIIMS_CRE_MOCK_TEST.html",
    ],
    "Pharmacy All Subject Wise Mock Test": [
      "Biochemistry_Mock_Test.html",
      "Community_Pharmacy_and_Mana.html",
      "DSPM_Drug_Store_and_Busines.html",
      "HAP_Human_Anatomy_and_Physi.html",
      "HCFP_Health_Education_and_C.html",
      "Hospital_and_Clinical_Pharm.html",
      "Pharmaceutics.html",
      "Pharmaceutical_Jurispruden.html",
      "Pharmacognosy.html",
      "Pharmacology_mock_test_1.html",
    ],
    "Railway Pharmacist Mock Test": [
      "FREE_RRB_Pharmacist_FINAL_Mock_Test.html",
      "RRB_Pharmacist_Mock_Test_2.html",
      "RRB_Pharmacist_Mock_Test_3.html",
      "RRB_Pharmacist_Mock_test_1.html",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Test list */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Mock Test Dashboard</h1>

        {Object.entries(tests).map(([category, files]) => (
          <div key={category} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">{category}</h2>
            <div className="bg-white shadow rounded-lg divide-y">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  onClick={() => router.push(`/viewer?file=${file}`)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    {/* Icon (A for test, PDF icon if .pdf) */}
                    {file.endsWith(".pdf") ? (
                      <span className="text-red-500">📕</span>
                    ) : (
                      <span className="text-blue-500">🅰️</span>
                    )}
                    <span className="text-gray-800">
                      {file.replace(".html", "").replace(".pdf", "")}
                    </span>
                  </div>

                  {/* Lock/unlock icon (abhi sab free hai, 🔓 dikhayenge) */}
                  <span className="text-gray-400">🔓</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right side - Promo / Info */}
      <div className="w-80 bg-white shadow-md p-4 hidden md:block">
        <h3 className="font-bold text-lg mb-2">Study Material</h3>
        <p className="text-sm text-gray-600 mb-4">
          For All Pharmacist Exams
        </p>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-xl font-bold text-blue-600 mb-2">
            ₹ 581 <span className="line-through text-gray-400">681</span>{" "}
            <span className="text-green-600">15% OFF</span>
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Get this course
          </button>
        </div>
      </div>
    </div>
  );
}
