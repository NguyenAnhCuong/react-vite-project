import { useRef } from "react";

const A = () => {
  // 👇️ create a ref for the file input
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);
  };

  const resetFileInput = () => {
    // 👇️ reset input value
    inputRef.current.value = null;
  };

  return (
    <div>
      <input ref={inputRef} type="file" onChange={handleFileChange} />

      <button onClick={resetFileInput}>Reset file input</button>
    </div>
  );
};

export default A;
