import Link from 'next/link'

const WithLink = ({ href = '/', children = <></>, ...otherProps }) => (
  <Link href={href}>
    <a {...otherProps}>{children}</a>
  </Link>
)

export default WithLink
