"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/app/LanguageContext"
import styles from "./GuitarDetailsSection.module.css"
import { Model } from "@/types/Model"

interface GuitarDetailsSectionProps {
  model?: Model
}

export default function GuitarDetailsSection({ model }: GuitarDetailsSectionProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "musicians">("specs")
  const [currentMusicianPage, setCurrentMusicianPage] = useState(0)
  
  const { language } = useLanguage()

  if (!model) {
    return (
      <div className={styles.detailsSection}>
        <div className="flex items-center justify-center p-8">
          <p>Loading guitar details...</p>
        </div>
      </div>
    )
  }

  const musiciansPerPage = 2
  const totalPages = Math.ceil(model.musicians.length / musiciansPerPage)
  const currentMusicians = model.musicians.slice(
    currentMusicianPage * musiciansPerPage,
    (currentMusicianPage + 1) * musiciansPerPage,
  )

  const texts = {
    en: {
      specification: "Specification",
      whoPlays: "Who plays it?",
      bodyWood: "Body Wood",
      neckWood: "Neck Wood",
      fingerboard: "Fingerboard",
      pickups: "Pickups",
      tuners: "Tuners",
      scaleLength: "Scale Length",
      bridge: "Bridge"
    },
    mk: {
      specification: "Спецификации",
      whoPlays: "Кој го користи?",
      bodyWood: "Дрво на тело",
      neckWood: "Дрво на врат",
      fingerboard: "Фингерборд",
      pickups: "Пикапи",
      tuners: "Механика",
      scaleLength: "Должина на скалата",
      bridge: "Мост"
    }
  }
  const t = texts[language]

  return (
    <section className={styles.detailsSection}>
      <div className={styles.tabsContainer}>
        <div className={styles.tabsHeader}>
          <button
            className={`${styles.tab} ${activeTab === "specs" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("specs")}
          >
            {t.specification}
          </button>
          <button
            className={`${styles.tab} ${activeTab === "musicians" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("musicians")}
          >
            {t.whoPlays}
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "specs" && (
            <div className={styles.specsContent}>
              <p className={styles.description}>{model.description}</p>
              <ul className={styles.specsList}>
                <li>
                  <span className={styles.specsDot}></span>
                  <strong>{t.bodyWood}:</strong> &quot;{model.specs.bodyWood}&quot;
                </li>
                <li>
                  <span className={styles.specsDot}></span>
                  <strong>{t.neckWood}:</strong> &quot;{model.specs.neckWood}&quot;
                </li>
                <li>
                  <span className={styles.specsDot}></span>
                  <strong>{t.fingerboard}:</strong> &quot;{model.specs.fingerboardWood}&quot;
                </li>
                <li>
                  <span className={styles.specsDot}></span>
                  <strong>{t.pickups}:</strong> &quot;{model.specs.pickups}&quot;
                </li>
                <li>
                  <span className={styles.specsDot}></span>
                  <strong>{t.tuners}:</strong> &quot;{model.specs.tuners}&quot;
                </li>
                <li>
                  <span className={styles.specsDot}></span>
                  <strong>{t.scaleLength}:</strong> &quot;{model.specs.scaleLength}&quot;
                </li>
                <li>
                  <span className={styles.specsDot}></span>
                  <strong>{t.bridge}:</strong> &quot;{model.specs.bridge}&quot;
                </li>
              </ul>
            </div>
          )}

          {activeTab === "musicians" && (
            <div className={styles.musiciansContent}>
              <div className={styles.musiciansGrid}>
                {currentMusicians.map((musician, index) => (
                  <div key={index} className={styles.musicianCard}>
                    <div className={styles.musicianImageWrapper}>
                      <Image
                        src={musician.musicianImage || "/placeholder.svg?height=400&width=400"}
                        alt={musician.name}
                        fill
                        className={styles.musicianImage}
                      />
                    </div>
                    <h3 className={styles.musicianName}>{musician.name}</h3>
                    {musician.bands && musician.bands.length > 0 && (
                      <p className={styles.musicianBands}>{musician.bands.join(", ")}</p>
                    )}
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`${styles.paginationDot} ${
                        currentMusicianPage === index ? styles.paginationDotActive : ""
                      }`}
                      onClick={() => setCurrentMusicianPage(index)}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
