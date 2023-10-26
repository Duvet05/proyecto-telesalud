import { useRouter } from "next/router";

export default function PerfilMedico(){
    const router = useRouter();
    const { codigo } = router.query;
    return (
        <div>{`Código de triaje: ${codigo}`}</div> 
    )

};

