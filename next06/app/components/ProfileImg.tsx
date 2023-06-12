import Image from "next/image";

function ProfileImg() {
  return (
    <section className="w-full mx-auto">
      <Image
        className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
        src="/images/avt.jpg"
        alt="Avatar"
        width={200}
        height={200}
        priority
      />
    </section>
  );
}

export default ProfileImg;
