"use client"
import styles from "./Mobile.module.css"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/app/LanguageContext"

export default function Mobile() {
  const { language } = useLanguage()
  const texts = {
    en: {
      heading: "Browse and buy your <span class='orange'>favorite guitars</span> with VibeStrings.",
      google: "Get it on Google Play",
      apple: "Download on the App Store"
    },
    mk: {
      heading: "Прелистувајте и купувајте ги вашите <span class='orange'>омилени гитари</span> со ВајбСтрингс.",
      google: "Преземи на Google Play",
      apple: "Преземи на App Store"
    }
  }
  const t = texts[language]

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div>
            <h1 className={styles.heading} dangerouslySetInnerHTML={{__html: t.heading}} />
          </div>

          <div className={styles.downloadBtns}>
            <Link href="#" className={styles.btn}>
              <Image
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt={t.google}
                width={220}
                height={66}
                className="h-18 w-auto"
              />
            </Link>
            <Link href="#" className={styles.btn2}>
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt={t.apple}
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.mockupWrap} style={{ zIndex: 1 }}>
            <div className={styles.ellipse} />

            <Image
              src="/images/guitar s1.png"
              alt="VibeStrings app feed screen"
              width={340}
              height={720}
              className={styles.phoneLeft}
              style={{ marginBottom: '0', marginTop: '0' }}
            />

            <Image
              src="/images/guitar s3.png"
              alt="VibeStrings app guitar detail screen"
              width={320}
              height={680}
              className={styles.phoneRight}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
