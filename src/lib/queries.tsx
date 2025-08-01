import { gql } from "@apollo/client"

export const GET_ALL_BRANDS = gql`
  query {
    findAllBrands {
      id
      name
      origin
      image
    }
  }
`

export const GET_BRAND_AND_MODELS = gql`
  query GetBrandAndModels($id: ID!) {
    findUniqueBrand(id: $id) {
      id
      name
      origin
      image
      categories
      models {
        id
        name
        type
        price
        image
      }
    }
  }
`

export const GET_MODEL_BY_ID = gql`
  query GetModelById($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`