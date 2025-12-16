import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: 'alissonrms/blog',
      }
    : {
        kind: 'local',
      },
  
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/data/blog/*',
      format: { contentField: 'content' },

      schema: {
        title: fields.slug({ 
          name: {
            label: 'Título',
            validation: { isRequired: true }
          },
          slug: {
            label: 'Nome do Arquivo (Slug)',
            description: 'Isso define o nome do arquivo físico .mdx'
          }
        }),

        slug: fields.text({
          label: 'URL Personalizada (postSlug)',
          description: 'Opcional. Se vazio, o Astro usa o nome do arquivo.',
        }),

        pubDatetime: fields.datetime({
          label: 'Data de Publicação',
          validation: { isRequired: true }
        }),

        description: fields.text({
          label: 'Descrição Curta',
          multiline: true,
          validation: { length: { min: 10 } }
        }),

        author: fields.text({
            label: 'Autor',
            defaultValue: 'Alishot', 
        }),

        draft: fields.checkbox({
            label: 'Rascunho (Draft)',
            defaultValue: false
        }),
        
        featured: fields.checkbox({
            label: 'Destaque (Featured)',
            defaultValue: false
        }),

        tags: fields.array(
            fields.text({ label: 'Tag' }),
            {
                label: 'Tags',
                itemLabel: props => props.value,
            }
        ),

        ogImage: fields.text({
            label: 'Caminho da Imagem (OG Image)',
            description: 'Ex: /assets/images/minha-foto.png',
        }),

        content: fields.mdx({
            label: 'Conteúdo',
            options: {
                image: {
                    directory: 'src/assets/images',
                    publicPath: '../../assets/images/',
                }
            }
        }),
        
        modDatetime: fields.datetime({ label: 'Data de Modificação' }),
        canonicalURL: fields.url({ label: 'URL Canônica' }),
        hideEditPost: fields.checkbox({ label: 'Esconder botão de editar' }),
        timezone: fields.text({ label: 'Timezone' }),
      },
    }),
  },
});