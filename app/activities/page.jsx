import ActivityForm from "@/components/activities/ActivityForm";

export default function ActivitiesPage() {
  return (
    <div className="full-container flex flex-col">
      <div className="text-4xl text-primary font-semibold mt-8 text-center">
        Actividades
      </div>
      <ActivityForm />
    </div>
  );
}
