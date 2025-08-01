import React from "react"
import { notFound } from "next/navigation"
import GuitarSelection from "./GuitarSelection"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  if (!id) return notFound()
  return <GuitarSelection brandId={id} />
}