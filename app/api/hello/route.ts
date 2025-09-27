import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

// export async function GET() {
//   const responseText = 'Hello World'

//   // In the edge runtime you can use Bindings that are available in your application
//   // (for more details see:
//   //    - https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#use-bindings-in-your-nextjs-application
//   //    - https://developers.cloudflare.com/pages/functions/bindings/
//   // )
//   //
//   // KV Example:
//   // const myKv = getRequestContext().env.MY_KV_NAMESPACE
//   // await myKv.put('suffix', ' from a KV store!')
//   // const suffix = await myKv.get('suffix')
//   // return new Response(responseText + suffix)

//   return new Response(responseText)
// }

export async function GET(request: Request) {
  const { env } = getRequestContext();
  const data = await env.MY_KV.get('key');
  return new Response(data);
}
