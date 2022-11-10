import * as Notion from './notion.types'

export const list = (txt: string, separate?: string) => {
    if (separate) {
        return String(txt).split(separate).map(t => t.trim())
    } else {
        return String(txt).split(/[\n\.\-∙]+/).map(t => t.trim())
    }
}
export const toRichText = (content: string, href?: string, color?: string): Notion.RichText => {
    return {
        text: toText(content, href),
        annotations: toAnnotations(color),
        plain_text: content,
        href: href ?? undefined,
    }
}
export const richText = (contents: string): Notion.RichText[] => {
    return list(contents, undefined).map((txt) => toRichText(txt))
}
export const multiSelect = (contents: string[]): Notion.Select[] => {
    return contents.map((txt) => toSelect(txt))
}
export const toTitle = (content: string, href?: string): Notion.RichText[] => {
    return [content].map((cnt) => toRichText(cnt, href))
}
export const toSelect = (name: string): Notion.Select => {
    return { name: name.replace(/,+/, '') }
}
export const toAnnotations = (color?: string): Notion.Annotations => {
    return {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: color ?? 'default',
    }
}
export const toText = (content: string, href?: string): Notion.Text => {
    if (href) {
        return {
            content,
            link: {
                url: href,
            }
        }
    } else {
        return {
            content,
            link: undefined
        }
    }
}
export const toImage = (src: string, index: number, company_name: string): Notion.File => {
    return {
        name: `${company_name}_${index}`,
        external: {
            url: src
        }
    }
}

export const thumbnails = (company_images: string[] | { url: string }[], com: string): Notion.File[] => {
    return company_images.map((img, i: number) => {
        if (typeof img == 'string') {
            return toImage(img, i, com)
        } else {
            return toImage(img.url, i, com)
        }
    });
}