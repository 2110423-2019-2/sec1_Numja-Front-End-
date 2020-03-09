import Link from 'next/link'

const WithLink = ({ href = '/', children = <></>, ...otherProps }) => (
  <>
    <Link href={href}>
      <a {...otherProps}>{children}</a>
    </Link>
    <style jsx>{`
      a {
        text-decoration: none;
        color: black;
      }
    `}</style>
  </>
)

export default WithLink
