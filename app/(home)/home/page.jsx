import Container from "@/app/components/Container";
import HomeForm from "@/app/components/HomeForm";
import Trending from "@/app/components/Trending";

export default function HomeApp() {
  return (
    <div className=" bg-muted pb-5">
      <div className=" w-full h-[40vh]  bg-foreground text-white font-medium text-2xl flex items-center justify-center bg-no-repeat"></div>
      <Container className={"px-5 pb-5"}>
        <div className=" mx-auto  -translate-y-1/2">
          <HomeForm />
        </div>
        <Trending />
      </Container>
    </div>
  );
}
