import createRepository from '~/api/Repository.js'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)

  const repositories = {
    translations: repositoryWithAxios('translations'),
    metadata: repositoryWithAxios('metadata')
  }

  inject('repositories', repositories)
}