import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { FormOT } from "../../../components/Forms";

export default function Update() {
  const { id } = useParams();

  return (
    <div className="w-full h-full text-black">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Ordenes de Trabajo", href: "/" },
          {
            label: `Actualizar OT ${id}`,
            href: `/OT/actualizar/${id}`,
            active: true,
          },
        ]}
      />
      <FormOT mode={"update"} otId={id}/>
    </div>
  );
}