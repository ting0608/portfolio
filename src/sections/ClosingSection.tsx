import { MeteorShower } from "../components/MeteorShower";
import { RevealText } from "../components/RevealText";
import { useInView } from "../hooks/useInView";

export function ClosingSection() {
  const { ref: sectionRef, inView: sectionActive } = useInView({
    threshold: 0.15,
    rootMargin: "0px",
  });

  return (
    <section ref={sectionRef} id="closing" className="section closing-section">
      <MeteorShower active={sectionActive} />
      <div className="closing-stage">
        <RevealText as="p" className="closing-text" delay={200}>
          That&apos;s all from me,
          <br />
          and I wish to see you again if our paths cross.
          <br />
          {/* <br />
          言尽于此，
          <br />
          再见。
          <br />
          <br />
          Itu sahaja dari I,
          <br />
          harap kita berjumpa lagi.
          <br />
          <br />
          以上です,
          <br />
          またどこかでお会いできれば嬉しいです。 */}
        </RevealText>
      </div>
    </section>
  );
}
