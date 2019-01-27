exports.seed = function (knex, Promise) {
  return knex('releases')
    .del()
    .then(function () {
      return knex('releases').insert([
        {
          id: 1,
          artist_id: 1,
          title: 'Celebration of Ignorance',
          slug: 'chuck-d-mistachuck-celebration-ignorance',
          filename: 'mistachuck.png',
          description: `Chuck D new solo , “Celebration of Ignorance,” a powerful addition to the hip hop legend’s formidable 30-year career. The album was written and recorded during an intensely prolific and creative period, which included new albums from both Public Enemy and Prophets of Rage (released in 2017), his 300+ page book “This Day in Rap and Hip-Hop History” (published by Hatchett’s Black Dog & Leventhal division in 2017), his first gallery show as a visual artist earlier this year and a return to cinematic composing. Chuck created additional music (with Amani K. Smith) for the new Showtime documentary series, “Shut Up and Dribble,” and his new track, “Speak On It,” will close out the final episode this Saturday at 9p.m. ET/PT.

After several whirlwind years of writing, recording, touring and creating art in multiple mediums, Chuck shows no signs of slowing down, telling fans, “Enjoy “Celebration of Ignorance” and catch me in 2019 on the road with Enemy Radio, Public Enemy, and Prophets of Rage, hopefully, maybe, doing these songs.” Chuck D is considered one of the most influential lyricists in contemporary music. Both as a solo artist and as the leader of the groundbreaking group Public Enemy (which was inducted into the Rock and Roll Hall of Fame in 2013), he helped pave the way for political, social, and culturally conscious hip-hop.
          
Public Enemy's albums remain among the most critically acclaimed works in the genre, including “It Takes a Nation of Millions to Hold Us Back” and “Fear of a Black Planet.” Chuck is also a prominent figure on the speaking circuit lending his voice to issues and causes ranging from technology to race relations.  He is also a founding member of the supergroup Prophets of Rage, alongside members of Rage Against the Machine and Cypress Hill. Tiredof45 (12.30.84) 2:13 Bot 3:09 Ain't No 2:50 Cavemanic 4:57 Mutterert 3:56 Speak on It! 2:54 Freedblack 4:03 Blacknificent 4:19 Celebration of Ignorance 1:43 Tiredof45 (10.18.18)`,
          published: true,
          created_at: '2019-01-19 12:00:00'
        },
        {
          id: 2,
          artist_id: 2,
          title: 'Afterburn',
          slug: 'dj-lord-afterburn',
          filename: 'dj-lord.jpg',
          description: `Los Angeles, Calif. (October 5, 2018) --- DJ Lord, turntablist for both Public Enemy and Prophets of Rage, drops a surprise set of tracks today with “AFTERBURN” featuring Chuck D and Kool Keith. Recorded, mixed and mastered during worldwide tours with both groups, the album leads with the single, “Eagle Force,” a collaboration between Lord, his longtime hero Kool Keith and producer Threepeeoh. The accompanying [video](https://www.youtube.com/watch?v=LISFyjdBUIc) is a nod to Keith’s fascination with space, adding an unexpected layer to his raw lyrics and Lord’s sound manipulation. “AFTERBURN” also includes “Terrorwrist” (produced by Mike Redman), which originally appeared on PE’s “Nothing Is Quick In the Desert,” as well as multiple instrumentals and remixes by Threepeeoh and C-Doc.

“I personally like to hear the beat rock,” Lord says, explaining why he wanted different versions of each track on the album. “If it’s a dope beat…let it breathe…scratch out to it…rock out.” “I love it when someone else remixes one of my tracks. It gives you another view, like ‘why didn’t I think of flipping the beat to that?’” “DJ Lord is a turntable musician,” adds Chuck D. “To work with him in not one, but two, groundbreaking groups, is a gift I could never repay.”

Lord has spent nearly 20 years behind the decks for Public Enemy and the past two years recording and touring stadiums as a member of The Prophets of Rage. He has been a DMC World DJ Championships finalist twice and has embarked on over 100 worldwide tours.`,
          published: true,
          created_at: '2019-01-19 12:01:00'
        },
        {
          id: 3,
          artist_id: 3,
          title: 'North Country',
          slug: 'anime-oscen-hive-north-country',
          description: `Comprised of longtime friends and performers, Leslie Allin, Eric Papky and Michael Brown; **Anime Oscen and Hive aka AO&H**, bring 17 years of chemistry to their music. The collaboration with Hive studios assisted Anime in producing songs which gained the attention of rap icon Chuck D. who mentored their message into politically charged country songs. These reflections underpin the artful and traditionally folk styles of Anime’s songwriting. The Hamilton, Ontario trio AO&H has recently compiled a 4-Track album release of North Country dubbed NewFolk C&W. The single and video for “Everyone’s Got Won” is a defense attack on gun abuse in the world at large, but specifically the USA. Just an example of the powerhouse music on release.
          
The trio performed four of their songs live at the Georgia Many Rivers To Cross Festival on October 1st 2016. The road trip to the festival and their performance there is part of an introspective documentary on the group. With two music videos released, their songs are making way to a fan base seeking more cerebral country music sounds.
          
SINGLES INCLUDE:
          
**“Everyone’s Got Won”** asks one to imagine a world where every single person, including toddlers, are walking around with a loaded gun. It paints a world where no one is ever able to relax. The message is clear: From afar it looks as though the USA is almost at this point.
          
Verse- “_You say that’s impossible, that child, with a smile. A toy in one hand, the other a fistful. This is not a nightmare, this is tomorrow if we have no fear our demise is near_.”
          
**“Borders, Waters and Orders”** touches on the United States government feeling free to dictate who is human on “their” soil as well in as every other country they want to control.
          
The second verse of the song speaks about the Black Lives Matters movement and its overdue importance in making certain types understand that they are no better than anyone else because of their skin color. The invalidity of war is the subject of the bridge. Not one for the faint of heart.
          
**“The Bad Kind of Pain”** A love song? No. A song about being toyed with, led down a primrose path to an unforeseen black hole of infinite depth. A man’s ego needing to be fed.
          
A woman’s heart, the casualty.
          
**“Uber Loser”** Inspired by the male Uber drivers being accused of inappropriate behavior while they should be providing a safe ride. A parody that quickly becomes more serious with a potent message to all males on the prowl.`,
          filename: 'anime-oscen.jpg',
          published: true,
          created_at: '2019-01-19 12:02:00'
        }
      ])
    })
}
