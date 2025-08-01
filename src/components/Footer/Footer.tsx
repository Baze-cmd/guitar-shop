"use client"
import Link from "next/link"
import { Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import Image from 'next/image'
import styles from "./Footer.module.css"
import { useLanguage } from "@/app/LanguageContext"

export default function Footer() {
  const { language, setLanguage } = useLanguage()

  const texts = {
    en: {
      logo: "VibeStrings",
      enquiry: "Enquiry@VibeStrings.com",
      location: "San Francisco",
      pages: "PAGES",
      store: "Store",
      collections: "Collections",
      support: "Support",
      product: "PRODUCT",
      terms: "Terms",
      privacy: "Privacy Policy",
      copyright: "Copyright",
      follow: "FOLLOW US",
      copyrightText: "© 2022 Copyright.VibeStrings",
      language: "Language",
      english: "English",
      macedonian: "Macedonian"
    },
    mk: {
      logo: "ВајбСтрингс",
      enquiry: "Прашање@VibeStrings.com",
      location: "Сан Франциско",
      pages: "СТРАНИЦИ",
      store: "Продавница",
      collections: "Колекции",
      support: "Поддршка",
      product: "ПРОДУКТ",
      terms: "Услови",
      privacy: "Политика за приватност",
      copyright: "Авторски права",
      follow: "СЛЕДЕТЕ НЕ",
      copyrightText: "© 2022 Авторски права.ВајбСтрингс",
      language: "Јазик",
      english: "Англиски",
      macedonian: "Македонски"
    }
  }
  const t = texts[language]

  return (
    <footer className={styles.footer}>
      <div className={styles.maxWidth}>
        <div className={styles.grid}>
          <div>
            <div className={styles.logoRow}>
              <Image
                src="/images/Group 5189.png"
                alt="VibeStrings logo"
                width={80}
                height={80}
                className={styles.logoImg}
                priority
              />
              <span className={styles.logoText}>{t.logo}</span>
            </div>
            <div className={styles.contact}>
              <div className={styles.contactRow}>
                <Mail className="w-4 h-4" />
                <span className={styles.contactText}>{t.enquiry}</span>
              </div>
              <div className={styles.contactRow}>
                <MapPin className="w-4 h-4" />
                <span className={styles.contactText}>{t.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className={styles.heading}>{t.pages}</h3>
            <div className={styles.linkList}>
              <Link href="/store" className={styles.link}>
                {t.store}
              </Link>
              <Link href="/collections" className={styles.link}>
                {t.collections}
              </Link>
              <Link href="/support" className={styles.link}>
                {t.support}
              </Link>
            </div>
          </div>

          <div>
            <h3 className={styles.heading}>{t.product}</h3>
            <div className={styles.linkList}>
              <Link href="/terms" className={styles.link}>
                {t.terms}
              </Link>
              <Link href="/privacy" className={styles.link}>
                {t.privacy}
              </Link>
              <Link href="/copyright" className={styles.link}>
                {t.copyright}
              </Link>
            </div>
          </div>

          <div>
            <h3 className={styles.heading}>{t.follow}</h3>
            <div className={styles.socialRow}>
              <Link href="#" className={styles.socialLink}>
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className={styles.socialLink}>
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className={styles.socialLink}>
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p className={styles.copyrightText}>{t.copyrightText}</p>
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <span>{t.language}: </span>
          <button
            onClick={() => setLanguage("en")}
            style={{
              color: language === "en" ? "#111" : "#ccc",
              fontWeight: language === "en" ? "bold" : "normal",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: 8
            }}
          >
            {t.english}
          </button>
          <button
            onClick={() => setLanguage("mk")}
            style={{
              color: language === "mk" ? "#111" : "#ccc",
              fontWeight: language === "mk" ? "bold" : "normal",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            {t.macedonian}
          </button>
        </div>
      </div>
    </footer>
  )
}
