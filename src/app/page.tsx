export default function Home() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl text-center">
        <b>Personal Website For Personal Things</b>
      </h1>
      <h2 className="text-center">
        <i>
          There are many like it, but this one is mine
        </i>
      </h2>
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <div>
          <br />
          I haven&apos;t done much personal/non-enterprise web development in a while, so this is kind of a work in progress that 
          functions both as &quot;figure out how to set up a frontend experience from scratch that looks appealing&quot;, and &quot;the last time I made 
          significant changes to my personal website was 10 revisions of Ubuntu ago, so time to dust off the old deploy pipeline chops.&quot;
          <br /><br />
          Unfortunately for the purposes of portfolio demonstration, most of my experience and projects lay in a proprietary codebase, so 
          this is my starting point.
          <br /><br />
          For now, you&apos;re going to see a lot of playing with layouts or little UI features. Probably using my cats as test subjects.
          <br /><br />
          Incidentally, you can find them over at &quot;Cats&quot;.
          <br /><br />
          Thanks for your time checking this out, and stay tuned.
        </div>
      </main>
    </div>
  );
}