built a working prototype for your gear marketplace social-listening system before applying so you can test it live right now.

live demo: https://gearsignal-ai.vercel.app
prd & architecture: https://github.com/exelentshakil/gearsignal-ai/blob/main/docs/PRD.md
1-page formal estimate: https://github.com/exelentshakil/gearsignal-ai/blob/main/docs/ESTIMATE.pdf

answering your questions directly:
1. similar work: built multi-platform listening pipelines in make and n8n with dual-ai failover, deduplication, and slack block kit alerts.
2. sources for $500: r/guitar, r/bass, r/guitarpedals (reddit oauth), thegearpage and talkbass (public rss/atom), youtube data api v3. all 5 included in budget.
3. how i monitor: 15-min cron polling via native http requests into sha-256 hash deduplication. x/twitter api basic tier costs $100/mo alone, so i recommend moving twitter to phase 2 unless you want rss bridge scraping.
4. recurring costs: total ~$6 to $10/mo. make core is $9/mo (or $5/mo on self-hosted n8n vps), openai gpt-4o-mini is ~$0.00015/post (~$1.35/mo for 300 posts/day), reddit/youtube/rss are $0 on standard quotas.
5. timeline: 10-14 days. 100% built inside your own make/n8n and slack accounts so you own everything.

test the live classifier with fee complaint text on the demo above. reply 'gear' and i will send the loom walkthrough and make blueprint json.

shaq
