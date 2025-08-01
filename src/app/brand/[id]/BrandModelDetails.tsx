import React from "react"
import { GET_MODEL_BY_ID } from "@/lib/queries"
import Image from "next/image"
import styles from "./Details.module.css"
import { useQuery } from "@apollo/client"
import { ChevronLeft } from "lucide-react"
import GuitarDetailsSection from "./GuitarDetailsSection"
import { useLanguage } from "@/app/LanguageContext"
import { Model } from "@/types/Model"

interface BrandModelDetailsProps {
    brandId: string
    modelId: string
    onBack: () => void
}

export default function BrandModelDetails({ brandId, modelId, onBack }: BrandModelDetailsProps) {
    const { data, loading, error } = useQuery<{ findUniqueModel: Model }, { brandId: string; modelId: string }>(GET_MODEL_BY_ID, {
        variables: { brandId, modelId },
    })
    const { language } = useLanguage()
    const texts = {
        en: {
            back: "Back To Listing",
            logo: "VibeStrings",
            loading: "Loading model...",
            notFound: "Model not found."
        },
        mk: {
            back: "Назад кон листата",
            logo: "ВајбСтрингс",
            loading: "Се вчитува моделот...",
            notFound: "Моделот не е пронајден."
        }
    }
    const t = texts[language]

    if (loading) return <div className={styles.loading}>{t.loading}</div>
    if (error || !data?.findUniqueModel) return <div className={styles.loading}>{t.notFound}</div>

    const model = data.findUniqueModel

    return (
        <div className={styles.container}>
            <section className={styles.heroSection}>
                <div className={styles.heroInner}>
                    <button type="button" className={styles.backLink} onClick={onBack}>
                        <ChevronLeft className="w-4 h-4" />
                        {t.back}
                    </button>
                    <div className={styles.heroLeft}>

                        <div className={styles.logoRow}>
                            <Image
                                src="/images/Group 5189.png"
                                alt="VibeStrings logo"
                                width={80}
                                height={80}
                                className="rounded-sm"
                                priority
                            />
                            <span className={styles.logoText}>{t.logo}</span>
                        </div>
                        <h1 className={styles.heroTitle}>
                            {data.findUniqueModel.name}
                        </h1>
                    </div>
                    <div className={styles.brandImageWrapper}>
                        <Image
                            src="/images/unsplash_H6j0Zsy91WY2.png"
                            alt="blob"
                            fill
                            priority
                        />
                        <Image
                            className={styles.guitarImg}
                            src={data.findUniqueModel.image}
                            alt="guitarImg"
                            fill
                            priority
                        ></Image>
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
            </section>
            <GuitarDetailsSection model={model} />
        </div>

    )
}
