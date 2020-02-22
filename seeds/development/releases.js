exports.seed = function(knex, Promise) {
  return knex('releases')
    .del()
    .then(function() {
      return knex('releases').insert([
        {
          id: 1,
          user_id: 1,
          artist_id: 1,
          label_id: 1,
          title: 'Celebration of Ignorance',
          slug: 'chuck-d-mistachuck-celebration-ignorance',
          filename: 'mistachuck.png',
          description: `Chuck D new solo , “Celebration of Ignorance,” a powerful addition to the hip hop legend’s formidable 30-year career. The album was written and recorded during an intensely prolific and creative period, which included new albums from both Public Enemy and Prophets of Rage (released in 2017), his 300+ page book “This Day in Rap and Hip-Hop History” (published by Hatchett’s Black Dog & Leventhal division in 2017), his first gallery show as a visual artist earlier this year and a return to cinematic composing. Chuck created additional music (with Amani K. Smith) for the new Showtime documentary series, “Shut Up and Dribble,” and his new track, “Speak On It,” will close out the final episode this Saturday at 9p.m. ET/PT.

After several whirlwind years of writing, recording, touring and creating art in multiple mediums, Chuck shows no signs of slowing down, telling fans, “Enjoy “Celebration of Ignorance” and catch me in 2019 on the road with Enemy Radio, Public Enemy, and Prophets of Rage, hopefully, maybe, doing these songs.” Chuck D is considered one of the most influential lyricists in contemporary music. Both as a solo artist and as the leader of the groundbreaking group Public Enemy (which was inducted into the Rock and Roll Hall of Fame in 2013), he helped pave the way for political, social, and culturally conscious hip-hop.
          
Public Enemy's albums remain among the most critically acclaimed works in the genre, including “It Takes a Nation of Millions to Hold Us Back” and “Fear of a Black Planet.” Chuck is also a prominent figure on the speaking circuit lending his voice to issues and causes ranging from technology to race relations.  He is also a founding member of the supergroup Prophets of Rage, alongside members of Rage Against the Machine and Cypress Hill. Tiredof45 (12.30.84) 2:13 Bot 3:09 Ain't No 2:50 Cavemanic 4:57 Mutterert 3:56 Speak on It! 2:54 Freedblack 4:03 Blacknificent 4:19 Celebration of Ignorance 1:43 Tiredof45 (10.18.18)`,
          catalog_number: 'cat0001',
          published: true,
          created_at: '2019-01-19 12:00:00',
        },
        {
          id: 2,
          user_id: 1,
          artist_id: 2,
          label_id: 1,
          title: 'Afterburn',
          slug: 'dj-lord-afterburn',
          filename: 'dj-lord.jpg',
          description: `Los Angeles, Calif. (October 5, 2018) --- DJ Lord, turntablist for both Public Enemy and Prophets of Rage, drops a surprise set of tracks today with “AFTERBURN” featuring Chuck D and Kool Keith. Recorded, mixed and mastered during worldwide tours with both groups, the album leads with the single, “Eagle Force,” a collaboration between Lord, his longtime hero Kool Keith and producer Threepeeoh. The accompanying [video](https://www.youtube.com/watch?v=LISFyjdBUIc) is a nod to Keith’s fascination with space, adding an unexpected layer to his raw lyrics and Lord’s sound manipulation. “AFTERBURN” also includes “Terrorwrist” (produced by Mike Redman), which originally appeared on PE’s “Nothing Is Quick In the Desert,” as well as multiple instrumentals and remixes by Threepeeoh and C-Doc.

“I personally like to hear the beat rock,” Lord says, explaining why he wanted different versions of each track on the album. “If it’s a dope beat…let it breathe…scratch out to it…rock out.” “I love it when someone else remixes one of my tracks. It gives you another view, like ‘why didn’t I think of flipping the beat to that?’” “DJ Lord is a turntable musician,” adds Chuck D. “To work with him in not one, but two, groundbreaking groups, is a gift I could never repay.”

Lord has spent nearly 20 years behind the decks for Public Enemy and the past two years recording and touring stadiums as a member of The Prophets of Rage. He has been a DMC World DJ Championships finalist twice and has embarked on over 100 worldwide tours.`,
          catalog_number: 'cat0002',
          published: true,
          created_at: '2019-01-19 12:01:00',
        },
        {
          id: 3,
          user_id: 1,
          artist_id: 3,
          label_id: 1,
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
          catalog_number: 'cat0003',
          published: true,
          created_at: '2019-01-19 12:02:00',
        },
        {
          id: 4,
          user_id: 1,
          artist_id: 4,
          label_id: 2,
          title: 'Shootin Like A Beatbox featuring SG EP',
          slug:
            'professor-daddy-o-shootin-like-beatbox-featuring-sg-ep',
          description: `SLBB a musical essay that visits the answer to gun violence in our community from one of Hip Hop's most prominent rap voices, Stetsasonic Frontman Professor  Daddy-O. The accompanying short film is an eerie examination of the deadly consequences of ignoring said violence. The energetic, Played Out "...hookah lounges, Bravo, Andy, and Mona Scott..." is a grown folk water cooler conversation about today's surreality. A hilarious interlude taps on, "Are you grown and still living with your moms, Dude?" followed by Shinin, a hardcore Brooklyn anthem that'll make everybody dance.-...GG`,
          catalog_number: 'cat0004',
          filename: 'daddy-o.jpg',
          published: true,
          created_at: '2019-01-19 12:03:00',
        },
        {
          id: 5,
          user_id: 1,
          artist_id: 5,
          label_id: 3,
          title: 'Booty And Hair',
          slug: 'memphis-jelks-booty-hair',
          description: `Memphis Jelks delivers a humor tinted song where the desire of enhancement in the daytime is the social club prelude to the club at night. Everybody wants to wonder what on the other side. Jelks also encourages people to be thankful for what they got, but sharing goals can be a social cultural exchange in the 21 C while spending money for it.`,
          filename: 'memphis-jelks.jpg',
          catalog_number: 'cat0005',
          published: true,
          created_at: '2019-01-19 12:04:00',
        },
        {
          id: 6,
          user_id: 1,
          artist_id: 6,
          label_id: 3,
          title: 'Bringin 88 Back',
          slug: 'rukus-music-bringin-88-back',
          description: `The 5 track debut album of MEGAFORCE 911 co founders Ced Rat and Mainy Main has entered again the strength of DETROIT HIPHOP.`,
          catalog_number: 'cat0006',
          filename: 'rukus-music.jpg',
          published: true,
          created_at: '2019-01-19 12:05:00',
        },
        {
          id: 7,
          user_id: 1,
          artist_id: 7,
          label_id: 1,
          title: 'Nation Builder',
          slug: 'jahi-pe20-nation-builder',
          description: `Nation Builder to send an alternative vibration out that counters the current crisis in leadership in America.The album was originally called 40+  tapped into A track by Pain 1.made Jahiplzay track for some of his students and they said that beat was hard to rhyme over. It really describes the thinking and feeling of Jahi around the present and future with music.

Jahi describes this albums songs in his own words

Chuck Speaks- Chuck D is like the head coach for Hip Hop culture. We did a concert together in LA and he came and introduced me. More importantly that bringing me on stage, his words of encouragement was for everyone. It inspired and motivated us all in that room. As a thank you and salute I shared his words of wisdom.

All Night-
I went to go see Rakim. The concert was so packed it was a fire hazard. Rakim talked about coming back in his 70’s to rock. I went home and these words came out.

Already Know-
Straight social commentary over Boombap.
Younger people are quick to saw they already know something which is where the hook came from. Some of my more important rhymes.

Nation Builder-
Title track. The album was originally called 40+ until I tapped into this track by Pain 1. I played the track for some of my students and they said that beat was hard to rhyme over. I kicked a verse for them over this beat that became the title track. The second verse really describes my thinking and feeling around the present and future with music.

Tired-
Ive had this track for almost a decade and never knew what to write. Never want to come off as tired in a sense of giving up or being weak about a situation. Once I was able to flip it to mean tired of injustice and put it in a way that gives the sense that it may be tiring dealing with systematic racism but like my ancestors who I shout out we keep pushing forward.

Tent City-
The homeless problem is America is so out of control and normalized. There is a huge tent city in Oakland on 27th and MLK and when I drove past I thought what would happen if I lost my financial security. I also looked in the eyes of many brothers and sisters homeless and heard these words coming from their pain.

Talk that Talk-
Channelling my inner Chuck D on this revisit. I called out Facebook and deporting of the Haitians and watched how all of these things became a part of public discourse. For me this is conscious battle rap where you are not taking on another MC, you are taking on ignorance and companies promoting death.

BLAP-Black Love & Power
Im an Oakland resident and really feel at home, but I am still originally from East Cleveland Ohio where we like beats that slap. When I heard this by DJ Pain 1 I knew I was going to use it, but wasn’t sure how to flip it. Once I got the chorus it was on. Social consciousness over trap.

Real Recognize Real
Im an introspective person at heart. Night time is always where I work out life. I also play beats mostly at night and open myself up to be a vessel for words. This track by Divided Souls wrote itself. The idea of going from good to great was on my mind for every line.`,
          catalog_number: 'cat0007',
          filename: 'jahi-pe20.jpg',
          published: true,
          created_at: '2019-01-19 12:06:00',
        },
        {
          id: 8,
          user_id: 1,
          artist_id: 8,
          label_id: 4,
          title: 'East Duel West',
          slug: 'east-duel-west-east-duel-west',
          description: `This new album by East Duel West is off the hook! Sammy and Charlie’s new instrumental project is extremely well produced. Each song is Powerful, full of emotion and Sammy and Charlie’s beats are EPIC!!! Music is great to paly when your doing work, dancing, cruising and is also great chill music. Can’t wait for their next project. Definitely pick this one up!`,
          catalog_number: 'cat0008',
          filename: 'east-duel-west.jpg',
          published: true,
          created_at: '2019-01-19 12:07:00',
        },
        {
          id: 9,
          user_id: 1,
          artist_id: 9,
          label_id: 5,
          title: 'The Familiar Stranger',
          slug: 'antwon-king-familiar-stranger',
          description: `The Familiar Stranger" is a very personal album but at the same time it's very relatable . The title is referring to people who may have never met me but listening to this album they will feel like they know me, hopefully . I want this album to inspire people to go hard for what they believe in and be proud of who they are. This is a soundtrack to our REAL life.`,
          catalog_number: 'cat0009',
          filename: 'antwon-king.jpg',
          published: true,
          created_at: '2019-01-19 12:08:00',
        },
        {
          id: 10,
          user_id: 1,
          artist_id: 10,
          label_id: 6,
          title: 'Live in Liverpool',
          slug: 'obeah-live-liverpool',
          description: `Recorded December 2 2015 during the off date of historic Public Enemy Tour 104 of UK and Europe with The Prodigy. MC OBEAH gets his indoctrination of planet rap performance while working with DJ LORD. On non arena dates OBEAH hit the stage opening with a solid 12 minute set featuring 2 songs recorded on DJ LORDs EAT THE RAT album Massdistractionville and World Citizen. World Citizen was predicted in song and video and new cuts Riots and Bloody were no doubt setting the stage in upcoming studio recordings by this Georgia MC.`,
          catalog_number: 'cat0010',
          filename: 'obeah.jpg',
          published: true,
          created_at: '2019-01-19 12:09:00',
        },
        {
          id: 11,
          user_id: 1,
          artist_id: 11,
          label_id: 7,
          title: 'The Devils You Know',
          slug: 'impossebulls-devils-you-know',
          description: `**Download this release for free in multiple digital formats (FLAC, MP3 & OGG) at [blocSonic](https://blocsonic.com/releases/bsog0057)**

Today **[The Impossebulls](https://blocsonic.com/artist/the-impossebulls)** return with their first album of all new material since 2014’s impressive _[“Everything Has Changed; Nothing Is Different”](https://blocsonic.com/releases/bsog0041)_! The new album, _“The Devils You Know”_ is another dope selection of joints that simultaneously take you back to that classic boom bap sound, while also remaining fresh and new.

As with the previous album, The Bulls enlist a little help from good friends and legends… the most notable of which is one of the founding members of the great Stetsasonic and one of the most distinctive voices in hip-hop… Daddy-O! Of course that’s not all… the great Kyle Jason lends his voice to the album… as does the talented Anime Oscen. Last, but surely not least… our own The Honorable Sleaze drops a verse!

This dope new album isn’t all, though… in the coming five months, The Bulls are dropping the 5x5 series of EPs. One each month featuring more new music! Also, very soon, fans will be able to purchase “Devil’s Work”… a limited edition box set containing the album and all five EPs, so fans don’t have to wait to get all that fresh music into their ears! We’ll let you know when that becomes available. For now… we hope you enjoy the new album.

A very sincere thank you to The Impossebulls and all collaborators for delivering yet another underground / independent / netlabel hip-hop classic. Sleepers will sleep… those who are woke will hear it. blocSonic’s going to continue to wake ’em. Word.

Of course, thanks once again to you for downloading & listening. We always strive to deliver the music you’ll love. Please spread the word about blocSonic, if you enjoy what we do. Remember… everything we release is cool to share! Always keep the music moving… share it… blog it… podcast it! If you’re in radio… support independent music and broadcast it!`,
          catalog_number: 'cat0011',
          filename: 'impossebulls.jpg',
          published: true,
          created_at: '2019-01-19 12:10:00',
        },
        {
          id: 12,
          user_id: 1,
          artist_id: 12,
          label_id: 8,
          title: 'Come Back',
          slug: 'jelani-malik-come-back',
          description: `Many times I get stuck in the struggles of trying to shape my future because I've pushed away memories of the past instead of facing them head on, letting go, and moving toward my future. The journey isn't the easiest but I make the best of it as I go. Come Back is the introduction to me.`,
          catalog_number: 'cat0012',
          filename: 'jelani-malik.jpg',
          published: true,
          created_at: '2019-01-19 12:11:00',
        },
      ]);
    });
};
