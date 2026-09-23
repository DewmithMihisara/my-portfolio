import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'

const recommendations = [
  {
    author: 'Siduja Perera',
    role: 'Project Manager at HCode Solutions',
    date: 'December 30, 2024',
    relation: 'Managed Dewmith directly',
    quote:
      'As a project manager, I have had the opportunity to evaluate Dewmith’s performance, and he always stands out as a hardworking and dedicated developer. His focus on delivering tasks on time and with precision is worthy of note. Dewmith has also been an excellent mentor to our interns, guiding them effectively in their projects and tasks, which has significantly enhanced their learning experience. His experience as a backend developer, paired with his enthusiasm for coding, sets him for a successful career in the technology business. Dewmith\'s dedication to quality and teamwork make him a valuable addition to our projects.',
  },
  {
    author: 'Kasun Vithanage',
    role: 'Founder of Akrivo Ltd · Software Engineer',
    date: 'October 15, 2024',
    relation: '',
    quote:
      'I had the pleasure of training Dewmith Mihisara in Software Engineering and was consistently impressed by his dedication, quick learning, and strong technical skills. He quickly grasps new concepts and applies them effectively in real-world projects. Dewmith writes clean, efficient code and approaches problems with a thoughtful, analytical mindset. He’s also a great team player who actively collaborates and contributes to discussions. I’m confident in Dewmith’s potential as a software engineer and highly recommend him as a talented, hardworking, and proactive professional.',
  },
  {
    author: 'Punsara Prathibha',
    role: 'Software Engineer at Wiley',
    date: 'December 6, 2023',
    relation: 'Former lecturer at IJSE',
    quote:
      "As a Lecturer I'm pleased to recommend Dewmith without any hesitation when he study at IJSE. Throughout his academic journey, he consistently demonstrated a strong work ethic, keen intellectual curiosity, and a passion for learning. He is a dedicated and responsible individual who consistently goes above and beyond expectations. I am confident that Dewmith will continue to thrive in any academic or professional pursuit he chooses to undertake in future.",
  },
  {
    author: 'Malan Amarasinghe',
    role: 'Senior Software Engineer - Android @ aeturnum',
    date: 'April 17, 2026',
    relation: 'Managed Dewmith directly',
    quote:
      'I had the chance to guide Dewmith while he was working on Flutter project (Lakshapathi), especially with app structure and state management using Provider.\n\nHe is a very hardworking person and always puts real effort into this project. What I like most is that he doesn’t give up easily — he keeps trying until he finds the right solution.\n\nHe understands concepts quickly, listens to feedback, and improves fast. I’ve seen him handle tasks responsibly and deliver good quality work on time.\n\nOverall, he’s someone you can trust to get the job done. I’m happy to recommend him to anyone looking for a dedicated Flutter developer.',
  },
  {
    author: 'Suhash Rodrigo',
    role: 'E2E Solution Architect at COMBANK',
    date: 'January 25, 2026',
    relation: 'Managed Dewmith directly',
    quote:
      'I had the pleasure of mentoring Dewmith Mihisara while working closely with him, where I provided architectural guidance, technical direction, and ongoing support during project standups. From the outset, Dewmith demonstrated strong technical competence, a genuine eagerness to learn, and a clear commitment to delivering high-quality results.\n\nDuring the News First – Parliament Election 2024 project, Dewmith played a significant role in backend development. Under my guidance, he successfully delivered multiple high-performance Spring Boot APIs that supported real-time election data processing. He also actively contributed to load testing and participated in monitoring the GCP infrastructure during peak election hours, helping ensure system stability and uninterrupted operations during critical periods.\n\nHaving mentored him closely, I was able to observe his professional growth firsthand. Dewmith quickly grasps architectural concepts, readily adopts best practices, and remains dependable even in time-sensitive, mission-critical environments. His problem-solving mindset, dedication, and positive attitude consistently set him apart.\n\nI confidently recommend Dewmith Mihisara and believe he will be a valuable asset to any team he joins.',
  },
]

const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.65, 0, 0.35, 1] as const },
  }),
}

export function TrustedVoicesSection() {
  const total = recommendations.length
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const activeRecommendation = useMemo(() => recommendations[activeIndex], [activeIndex])

  const cycleTo = (nextIndex: number) => {
    setDirection(nextIndex > activeIndex ? 1 : -1)
    const safeIndex = (nextIndex + total) % total
    setActiveIndex(safeIndex)
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      cycleTo(activeIndex + 1)
    }, 9000)
    return () => window.clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, total])

  const handleDotNavigate = (index: number) => {
    if (index === activeIndex) return
    cycleTo(index)
  }

  return (
    <section className="flex h-full flex-col justify-center overflow-y-auto bg-background px-6 pb-24 pt-28 md:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Trusted Voices</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Testimonials that fuel my craft
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Mentors, leaders, and collaborators who have experienced my commitment to quality
            engineering, dependable delivery, and collaborative problem solving.
          </p>
        </motion.div>

        <div className="card mx-auto w-full max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <span className="flex size-10 items-center justify-center rounded-full border border-border text-foreground">
              <Quote className="size-4" />
            </span>
            <span className="tag">
              {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>
          </div>

          <div className="mt-6 overflow-hidden">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.article
                key={activeRecommendation.author}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground sm:text-base">
                  {activeRecommendation.quote}
                </p>

                <div className="mt-5 border-t border-border pt-4">
                  <h3 className="text-base font-semibold text-foreground">
                    {activeRecommendation.author}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[activeRecommendation.role, activeRecommendation.date, activeRecommendation.relation]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2">
              {recommendations.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={item.author}
                    type="button"
                    onClick={() => handleDotNavigate(index)}
                    className={[
                      'size-2 rounded-full transition-all duration-200',
                      isActive ? 'scale-125 bg-foreground' : 'bg-border',
                    ].join(' ')}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => cycleTo(activeIndex - 1)}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition hover:border-foreground/40"
                aria-label="Previous recommendation"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => cycleTo(activeIndex + 1)}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition hover:border-foreground/40"
                aria-label="Next recommendation"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
