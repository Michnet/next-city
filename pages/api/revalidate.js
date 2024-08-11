//import { siteKeys } from "~/server/Base"

export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
     const params = req.query;
    /*if (params.secret !== siteKeys.rebuild_key) {
      return res.status(401).json({ message: 'Invalid token' })
    } */
   
    try {
        console.log('path', params.path)
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await res.revalidate(`${params.path}`)
      return res.json({ revalidated: true })
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      console.log('err', err);
      return res.status(500).send('Error revalidating')
    }
  }