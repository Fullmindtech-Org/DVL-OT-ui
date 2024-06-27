import Breadcrumbs from "../../../components/Breadcrumbs";
import { FormOT } from "../../../components/Forms";

export default function Create() {
  return (
    <div className="w-full h-full text-black">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Ordenes de Trabajo", href: "/" },
          {
            label: "Crear OT",
            href: "/OT/crear",
            active: true,
          },
        ]}
      />
      <FormOT />
    </div>
  );
}
