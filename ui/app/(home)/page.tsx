export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-medium tracking-tight text-neutral-700">
        Bring Premium Lighting to Your Space
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="OB h-100 rounded sm:col-span-2">
          <Img src="/img/1.jpg" />
        </div>
        <div className="GB h-100 rounded sm:col-span-1">
          <Img src="/img/2.jpg" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="BB h-100 rounded sm:col-span-1">
          <Img src="/img/3.jpg" />
        </div>
        <div className="PB h-100 rounded sm:col-span-2">
          <Img src="/img/4.jpg" />
        </div>
      </div>
    </div>
  )
}

function Img({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      className="h-full w-full rounded object-cover object-top"
    />
  )
}
