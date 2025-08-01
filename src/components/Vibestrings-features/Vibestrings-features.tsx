"use client"

import styles from "./Vibestrings-features.module.css"
import { Grid3X3, Truck, CreditCard } from "lucide-react"
import { useLanguage } from "@/app/LanguageContext"

export default function VibeStringsFeatures() {
  const { language } = useLanguage()
  const texts = {
    en: {
      heading: "Why try <span class='orange'>VibeStrings</span>?",
      smooth: "SMOOTH BROWSING",
      easy: "EASY DELIVERY",
      secure: "SECURE PAYMENT",
      lorem: "Lorem Ipsum Dolor Sit Amet,<br />Consectetur Adipiscing Elit."
    },
    mk: {
      heading: "Зошто да пробате <span class='orange'>VibeStrings</span>?",
      smooth: "ЛЕСНО ПРЕЛИСТУВАЊЕ",
      easy: "ЛЕСНА ДОСТАВА",
      secure: "БЕЗБЕДНО ПЛАЌАЊЕ",
      lorem: "Лорем Ипсум Долор Сит Амет,<br />Консектетур Адипискинг Елит."
    }
  }
  const t = texts[language]

  return (
    <section className={styles.section}>
      <div className={styles.maxWidth}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading} dangerouslySetInnerHTML={{__html: t.heading}} />
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrap}>
              <Grid3X3 className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>{t.smooth}</h3>
            <p className={styles.cardText} dangerouslySetInnerHTML={{__html: t.lorem}} />
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrap}>
              <Truck className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>{t.easy}</h3>
            <p className={styles.cardText} dangerouslySetInnerHTML={{__html: t.lorem}} />
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrap}>
              <CreditCard className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>{t.secure}</h3>
            <p className={styles.cardText} dangerouslySetInnerHTML={{__html: t.lorem}} />
          </div>
        </div>
      </div>
    </section>
  )
}
