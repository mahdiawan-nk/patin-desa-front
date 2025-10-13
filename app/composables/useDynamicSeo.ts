// composables/useDynamicSeo.ts
export const useDynamicSeo = (data: {
  title?: string
  description?: string
  image?: string
}) => {
  useSeoMeta({
    title: () => data.title ?? 'Kampung Patin',
    description: () => data.description ?? 'Budidaya ikan patin segar',
    ogTitle: () => data.title ?? 'Kampung Patin',
    ogDescription: () => data.description ?? 'Budidaya ikan patin segar',
    ogImage: () => data.image ?? '/default.jpg',
    twitterCard: 'summary_large_image'
  })
}
