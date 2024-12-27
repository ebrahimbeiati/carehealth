import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

// const Home =async ({ searchParams }: SearchParamProps) => {
//   const isAdmin =  searchParams?.admin === "true";

//   return (
//     <div className="flex h-screen max-h-screen">
//       {/* Otp verification*/}
//       {isAdmin && <PasskeyModal />}
//       <section className="remove-scrollbar container my-auto">
//         <div className="sub-container max-w-[496px]">
//           <Image
//             src="/logo.png"
//             alt="logo"
//             width={496}
//             height={496}
//             className="mb-12 h-10 w-fit rounded"
//           />
//           <PatientForm />
//           <div className="flex justify-between text-14-regular mt-20">
//             <p className="text-dark-600 justify-end xl:text-left">
//               Care Health © All rights reserved.
//             </p>
//             <Link className="text-green-500" href="/?admin=true">
//               Admin
//             </Link>
//           </div>
//         </div>
//       </section>
//       <Image
//         src="/onboarding-img.png"
//         alt="onboarding"
//         width={1000}
//         height={1000}
//         className="size-img max-w-[50%]"
//       />
//     </div>
//   );
// };
const Home = async ({ searchParams }: SearchParamProps) => {
  const params = await searchParams;
  const isAdmin = params?.admin === 'true';

  return (
    <div className="flex h-screen max-h-screen">
      {/* Otp verification */}
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/logo.png"
            alt="logo"
            width={496}
            height={496}
            className="mb-12 h-10 w-fit rounded"
          />
          <PatientForm />
          <div className="flex justify-between text-14-regular mt-20">
            <p className="text-dark-600 justify-end -left">
              Care Health © All rights reserved.
            </p>
            <Link className="text-green-500" href="/?admin=true">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/onboarding-img.png"
        alt="onboarding"
        width={1000}
        height={1000}
        className="size-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
