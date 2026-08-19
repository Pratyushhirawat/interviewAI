import React from "react";
import { useReactToPrint } from "react-to-print";
import { FiDownload } from "react-icons/fi";
import { useCoins } from "../../apis/userApi";

function DownloadBtn({ docRef, user, setUser }) {
  const handlePdf = useReactToPrint({
    contentRef: docRef,
    documentTitle: "FresherAIPDF",
  });

  const handleDownload = async () => {
    try {
      const coinResponse = await useCoins({
        coins: 10,
        action: "resume-builder",
      });

      setUser((prev) => ({
        ...prev,
        interviewCoin: coinResponse?.interviewCoin,
      }));

      handlePdf();

    } catch (error) {
        if(error.response?.status === 403) {
            return alert("Not enough interview coins." )
        }
        alert(error.response?.data?.message || "Something went wrong.")
    }
  };
  return (
    <button
      onClick={handleDownload}
      className=" flex items-center gap-2 cursor-pointer rounded-lg bg-black px-3 py-2 text-xs text-white"
    >
      <FiDownload size={15} />
      Download Resume
    </button>
  );
}

export default DownloadBtn;
