
"use client"
import { useSearchParams } from "next/navigation";
const EntityDetail = () => {
  const router = useSearchParams();
  const rowId = router.get('rowId')
debugger
  return (
    <div>
      <h1>{rowId}</h1>
    </div>
  );
};

export default EntityDetail;