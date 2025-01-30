export interface Banner {
    id: number
    url: string
    image: string
}

export interface siteSettings {
    id: string
    domain: string
    site_name: string
    site_logo: string
    site_icon: string | null
    site_about: string
    rules: string
    twitter: string | null
    linkedin: string | null
    instagram: string | null
    email: string | null
    copyright: string | null
}

export interface FAQ {
    id: number;
    question: string
    answer: string
}

export interface electronicSymbol {
    id: number;
    url: string
    image: string
}