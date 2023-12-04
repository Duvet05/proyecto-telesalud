"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BackPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.back();
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p>Redireccionando...</p>
    </div>
  );
};

export default BackPage;
