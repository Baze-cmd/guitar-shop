"use client"

import Image from "next/image"
import { useQuery } from "@apollo/client"
import { GET_ALL_BRANDS } from "@/lib/queries"
import styles from "./Intro.module.css"
import Link from "next/link"
import { Brand } from "@/types/Brand"
import { useLanguage } from "@/app/LanguageContext"

type BrandsData = {
  findAllBrands: Brand[]
}

export default function Intro() {
  const { loading, error, data } = useQuery<BrandsData>(GET_ALL_BRANDS)
  const { language } = useLanguage()
  const texts = {
    en: {
      logo: "VibeStrings",
      browse: "Browse top quality",
      guitarsOnline: "Guitars online",
      description: "Explore 50k+ latest collections of branded guitars online with VibeStrings.",
      heading: "Featuring the <span class='orange'>Best Brands</span>",
      subtext: "Select your preferred brand and explore our exquisite collection.",
      error: "Error Loading Brands"
    },
    mk: {
      logo: "ВајбСтрингс",
      browse: "Прелистувајте врвни",
      guitarsOnline: "Гитари онлајн",
      description: "Истражете над 50.000 најнови колекции на бренд гитари онлајн со ВајбСтрингс.",
      heading: "Претставување на <span class='orange'>Најдобрите брендови</span>",
      subtext: "Изберете го вашиот омилен бренд и истражете ја нашата извонредна колекција.",
      error: "Грешка при вчитување на брендови"
    }
  }
  const t = texts[language]

  const isExternalUrl = (url: string | null | undefined): boolean => {
    if (!url) return false
    return url.startsWith('http://') || url.startsWith('https://')
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading}>
            Featuring the <span className={styles.orange}>Best Brands</span>
          </h2>
          <p className={styles.subtext}>Select your preferred brand and explore our exquisite collection.</p>
        </div>
        <div className={styles.grid}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.skeleton}>
              <div className={styles.skeletonBox}></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h2 className={styles.error}>{t.error}</h2>
        <p className={styles.errorMsg}>{error.message}</p>
      </div>
    )
  }

  return (
    <>
      <div className={styles.mainSection}>
        <div className={styles.mainContainer}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <div className={styles.logoFlex}>
                <div className={styles.logoImg}>
                  <Image
                    src="/images/Group 5189.png"
                    alt="VibeStrings logo"
                    width={80}
                    height={80}
                    className="rounded-sm"
                    priority
                  />
                </div>
                <span className={styles.logoText}>{t.logo}</span>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className={styles.mainHeading}>{t.browse}</h1>
              <h1 className={styles.mainHeading}>
                <span className={styles.orangeText}>{t.guitarsOnline.split(' ')[0]}</span> <span style={{ color: '#1a202c' }}>{t.guitarsOnline.split(' ')[1]}</span>
              </h1>
            </div>
            <p className={styles.subText}>{t.description}</p>
          </div>
          <div className={styles.rightImgSection}>
            <div
              className={styles.curvedImg}
            >
              <Image
                src="/images/unsplash_H6j0Zsy91WY.png"
                alt="guitar"
                fill
                className={styles.heroImg}
                priority
              />
              <div className={styles.overlayLogo}>
                <Image
                  src="/images/Group 5189.png"
                  alt="VibeStrings logo overlay"
                  width={80}
                  height={80}
                  className={styles.overlayLogoImg}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white">
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: t.heading }} />
            <p className={styles.subtext}>{t.subtext}</p>
          </div>
          <div className={styles.grid}>
            {data?.findAllBrands.map((brand) => {
              return (
                <Link key={brand.id} href={`/brand/${brand.id}`} className={styles.brandCard + " group"}>
                  <div className={styles.brandImgWrap}>
                    {isExternalUrl(brand.image) ? (
                      <img
                        src={brand.image!}
                        alt={`${brand.name} logo`}
                        className={styles.brandImg}
                        style={{ 
                          width: "auto", 
                          height: "auto", 
                          maxWidth: "150px", 
                          maxHeight: "60px",
                          objectFit: "contain"
                        }}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg"
                        }}
                      />
                    ) : (
                      <img
                        src={brand.image || "/placeholder.svg"}
                        alt={`${brand.name} logo`}
                        className={styles.brandImg}
                        style={{ 
                          width: "auto", 
                          height: "auto", 
                          maxWidth: "150px", 
                          maxHeight: "60px",
                          objectFit: "contain"
                        }}
                        loading="lazy"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}