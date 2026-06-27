export default function Home() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl text-center">
        <b>Personal Website For Personal Things</b>
      </h1>
      <h2 className="text-center">
        <i>There are many like it, but this one is mine</i>
      </h2>
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <div className="space-y-4">
          <p>
            This is kind of a perpetual work in progress that functions both as
            &quot;figure out how to set up a frontend experience from scratch
            that looks appealing&quot;, and &quot;the last time I made a
            portfolio was 10 revisions of Ubuntu ago, and half the time I just
            used it to scp random homework files to, so time to dust off the old
            deploy pipeline chops.&quot;
          </p>
          <p>
            Unfortunately for the purposes of Actual Work portfolio
            demonstration, most of my experience and contributions are in
            proprietary codebases, so this is my somewhat weaker proof to the
            universe that I can do stuff.
          </p>
          <p>
            For now, you&apos;re going to see a lot of playing with layouts or
            little UI features. Probably using my cats as test subjects.
          </p>
          <p>Incidentally, you can find them over at &quot;Cats&quot;.</p>
          <p>Thanks for your time checking this out, and stay tuned.</p>
        </div>
      </main>
    </div>
  );
}
