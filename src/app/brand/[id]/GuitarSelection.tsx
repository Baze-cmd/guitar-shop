"use client"

import React from "react"
import { useState, useEffect, useCallback } from "react"
import { useQuery } from "@apollo/client"
import { Search, Filter, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { Guitar } from "@/types/Guitar"
import { GET_BRAND_AND_MODELS } from "@/lib/queries"
import Footer from "@/components/Footer/Footer"
import BrandModelDetails from "./BrandModelDetails"
import styles from "./BrandPage.module.css"
import { useLanguage } from "@/app/LanguageContext"

type BrandData = {
    findUniqueBrand: {
        id: string
        name: string
        origin: string
        image: string
        categories: string[]
        models: Guitar[]
    }
}

type GuitarSelectionProps = {
  brandId: string
}

export default function GuitarSelection({ brandId }: GuitarSelectionProps) {
    const { language } = useLanguage()
    const texts = {
        en: {
            backToHome: "Back To Home",
            playLike: "Play like a",
            rockstar: "Rock star",
            legacy: "With a legacy dating back to the 1950s, {brand} blends expert craftsmanship with cutting-edge innovation to\ndeliver guitars that inspire creativity and elevate your performance. Trusted by top artists worldwide,\n{brand} guitars are built to play fast, sound bold, and stand out on any stage.",
            askChat: "Ask ChatGPT",
            checkSelection: "Check out the",
            selection: "Selection",
            filterByType: "Filter by type",
            bass: "Bass",
            acoustic: "Acoustic",
            electric: "Electric",
            searchPlaceholder: "Search by name",
            showingResults: "SHOWING {filtered} RESULTS FROM {total}",
            errorLoading: "Error loading guitars: "
        },
        mk: {
            backToHome: "Назад кон почетна",
            playLike: "Свири како",
            rockstar: "Рок ѕвезда",
            legacy: "Со наследство од 1950-тите, {brand} комбинира врвна изработка со најнова иновација за\nда испорача гитари кои инспирираат креативност и го подигнуваат вашиот настап. Доверени од врвни артисти ширум светот,\n{brand} гитарите се направени за брзо свирење, моќен звук и издвојување на секоја сцена.",
            askChat: "Прашајте ChatGPT",
            checkSelection: "Погледнете ја",
            selection: "Селекцијата",
            filterByType: "Филтрирај по тип",
            bass: "Бас",
            acoustic: "Акустична",
            electric: "Електрична",
            searchPlaceholder: "Пребарај по име",
            showingResults: "ПРИКАЖАНИ {filtered} РЕЗУЛТАТИ ОД {total}",
            errorLoading: "Грешка при вчитување на гитари: "
        }
    }
    const t = texts[language]
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTypes, setSelectedTypes] = useState<string[]>(["all"])
    const [guitars, setGuitars] = useState<Guitar[]>([])
    const [brand, setBrand] = useState<BrandData["findUniqueBrand"] | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [offset, setOffset] = useState(0)
    const limit = 6
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedModelId, setSelectedModelId] = useState<string | null>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const { data, loading, error } = useQuery<BrandData, { id: string }>(GET_BRAND_AND_MODELS, {
        variables: { id: brandId },
    })

    useEffect(() => {
        if (data?.findUniqueBrand) {
            setBrand(data.findUniqueBrand)
            setGuitars(data.findUniqueBrand.models)
            setHasMore(data.findUniqueBrand.models.length > limit)
        }
    }, [data, limit])

    const handleTypeSelect = (type: string) => {
        if (type === "all") {
            setSelectedTypes(["all"]);
        } else {
            setSelectedTypes((prev) => {
                if (prev.includes(type)) {
                    const filtered = prev.filter((t) => t !== type);
                    return filtered.length === 0 ? ["all"] : filtered;
                } else {
                    return prev.filter((t) => t !== "all").concat(type);
                }
            });
        }
    };

    const filteredGuitars = guitars.filter((guitar) => {
        const matchesSearch = guitar.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = selectedTypes.includes("all") || selectedTypes.includes(guitar.type.toLowerCase())
        return matchesSearch && matchesType
    })

    const loadMore = useCallback(async () => {
        if (!hasMore || loading || !brand) return

        const nextOffset = offset + limit
        const moreGuitars = brand.models.slice(nextOffset, nextOffset + limit)
        if (moreGuitars.length > 0) {
            setGuitars((prev) => [...prev, ...moreGuitars])
            setOffset(nextOffset)
            setHasMore(brand.models.length > nextOffset + limit)
        } else {
            setHasMore(false)
        }
    }, [hasMore, loading, offset, limit, brand])

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
                loadMore()
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [loadMore])

    useEffect(() => {
        if (!dropdownOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen])

    if (selectedModelId) {
        return <>
            <BrandModelDetails brandId={brandId} modelId={selectedModelId} onBack={() => setSelectedModelId(null)} />
            <Footer />
        </>
    }
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">{t.errorLoading}{error.message}</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <section className={styles.heroSection}>
                <div className={styles.heroInner}>
                    <Link href="/" className={styles.backLink}>
                        <ChevronLeft className="w-4 h-4" />
                        {t.backToHome}
                    </Link>
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
                            <span className={styles.logoText}>{language === "mk" ? "ВајбСтрингс" : "VibeStrings"}</span>
                        </div>
                        <h1 className={styles.heroTitle}>
                            {t.playLike} <span className={styles.rockstar}>{t.rockstar}</span>
                        </h1>
                        <p className={styles.heroDesc}>
                            {t.legacy.replaceAll("{brand}", brand?.name || "this brand")}
                        </p>
                        <p className={styles.askChat}>{t.askChat}</p>
                    </div>
                    <div className={styles.brandImageWrapper}>
                        <Image
                            src="/images/unsplash_H6j0Zsy91WY2.png"
                            alt={brand?.name || "Brand image"}
                            fill
                            className={styles.brandImage}
                            priority
                        />
                        <span className={styles.brandNameOverlay}>
                            {brand?.name || (language === "mk" ? "Бренд" : "Brand")}
                        </span>
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
            <section className={styles.selectionSection}>
                <div className={styles.selectionInner}>
                    <h2 className={styles.selectionTitle}>
                        {t.checkSelection} <span className={styles.selectionHighlight}>{t.selection}</span>
                    </h2>
                    <div className={styles.filters}>
                        <div className={styles.filterDropdownWrapper} ref={dropdownRef}>
                            <button
                                className={styles.filterButton + (selectedTypes.length > 0 ? ' ' + styles.selectedType : '')}
                                type="button"
                                onClick={() => setDropdownOpen((open) => !open)}
                            >
                                <Filter className={styles.filterIcon} />
                                <span className={selectedTypes.length > 0 ? styles.selectedType : undefined}>
                                    {t.filterByType}
                                </span>
                                <span className={styles.arrowDown}>▼</span>
                            </button>
                            {dropdownOpen && (
                                <div className={styles.dropdownList}>
                                    {[{ value: 'bass', label: t.bass }, { value: 'acoustic', label: t.acoustic }, { value: 'electric', label: t.electric }].map(option => (
                                        <div
                                            key={option.value}
                                            className={styles.dropdownItem + (selectedTypes.includes(option.value) ? ' ' + styles.selectedType : '')}
                                            onClick={() => handleTypeSelect(option.value)}
                                        >
                                            <span>{option.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.searchInput}>
                            <Search className={styles.searchIcon} />
                            <Input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    {loading && guitars.length === 0 ? (
                        <div className={styles.loadingSpinner}>
                            <div className={styles.loadingSpinnerInner}></div>
                        </div>
                    ) : (
                        <>
                            <div className={styles.guitarGrid}>
                                {filteredGuitars.map((guitar, idx) => (
                                    <div
                                        key={guitar.id + '-' + idx}
                                        className={styles.guitarCardClickable}
                                        onClick={() => setSelectedModelId(guitar.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Card className={styles.guitarCard}>
                                            <CardContent className={styles.guitarCardContent}>
                                                <div className={styles.guitarImageWrapper}>
                                                    <img
                                                        src={guitar.image || "/placeholder.svg"}
                                                        alt={guitar.name}
                                                        width={300}
                                                        height={300}
                                                        className={styles.guitarImage}
                                                    />
                                                </div>
                                                <h3 className={styles.guitarName}>{guitar.name}</h3>
                                                <p className={styles.guitarType}>{guitar.type}</p>
                                                <p className={styles.guitarPrice}>${guitar.price.toLocaleString()}.00</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                            {loading && guitars.length > 0 && (
                                <div className={styles.loadingSpinner}>
                                    <div className={styles.loadingSpinnerInner}></div>
                                </div>
                            )}
                            <div className={styles.resultsCount}>
                                <span>
                                    {t.showingResults.replace("{filtered}", filteredGuitars.length.toString()).replace("{total}", guitars.length.toString())}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    )
}
