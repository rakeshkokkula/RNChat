const logger = require('pino')()

logger.info('info: hello world')
logger.warn('warn')
logger.fatal('fatal')
logger.error('error')

const child = logger.child({ a: 'property' })
child.info('hello child!')