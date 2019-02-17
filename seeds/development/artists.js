exports.seed = function(knex, Promise) {
  return knex("artists")
    .del()
    .then(function() {
      return knex("artists").insert([
        {
          id: 1,
          name: "Chuck D aka Mistachuck",
          slug: "chuck-d-aka-mistachuck",
          description: `Roosevelt Long Island can claim many celebrated figures, and chief among them would be famed, and now iconic rap group Public Enemy. An outfit known for their revolutionary, pro-black / anti-government lyricism and groundbreaking production, are still sought after representatives even within a demonizing media. PE's fiery rhymes and unique stage show won millions of fans across the globe and having helmed the main mic for a legendary period is Chuck D. If Hip Hop were a nation Chuck D would be the president, democratically nominated by an inspired generation of musicians and music followers, around the world.

The critical and commercial success of Public Enemy opened the doors for MistaChuck to deliver a message through a number of different mediums, extending a reach to all segments of the population. From a featured host on the Fox News Channel, to best-selling author of his autobiography, "Fight The Power." He is a highly-sought after and popular speaker on the college lecture circuit (universities ranging from Harvard to Howard), a prominent member of music industry non-profit organization's MusicCares and Rock The Vote (which honored him with the Patrick Lippert Award in 1996 for his contributions to community service) and founder of the SlamJamz label.

Chuck D has led the musical and social movement as national spokesperson for Rock The Vote, the National Urban League and the National Alliance of African American Athletes; while appeared in public service announcements for HBO's campaign for national peace and the Partnership for the Drug Free America as well as a regular guest on numerous television shows including Nightline, Politically Incorrect and on CNN. The Public Enemy 20th anniversary album, tour and subsequent international media presence have livened yet another generation, as MistaChuck strives to use his diverse and dedicated presence within the digital and technological realm to forge a musical path for said generation. From a book imprint with partner Yusuf Jah, to subsidiary labels such as SHEdigital; the innovative empire born of twenty years of serving the people with power is set to launch even more unique vehicles for new talent.`,
          created_at: "2019-01-20 12:00:00"
        },
        {
          id: 2,
          name: "DJ Lord",
          slug: "dj-lord",
          created_at: "2019-01-20 12:01:00"
        },
        {
          id: 3,
          name: "Anime Oscen & Hive",
          slug: "anime-oscen-hive",
          description: `DJ Lord is an Earthizen DJ and turntablist. 

In 1999, DJ Lord joined the hip hop group Public Enemy on its 40th World Tour replacing Terminator X. Soon after, DJ Lord had his own performance segment within the Public Enemy show. While hip hop has been at the foundation of his career, he also works in the drum and bass arena. His career and the art of turntablism is documented in the DVD, DJ Lord - The Turntablist Chronicles, released in 2004.

In addition to working with Public Enemy, DJ Lord tours solo as well as with Flavor Flav in his solo effort as well as with art exhibition Arts, Beats + Lyrics. He has also performed with rock band Confrontation Camp and TrillBass.

In December 2014 he released his first solo album with 2MP (2 Much Posse) entitled “Eat The Rat” on Spit Digital.`,
          created_at: "2019-01-20 12:02:00"
        },
        {
          id: 4,
          name: "Professor Daddy O",
          slug: "professor-daddy-o",
          description: `
Hip hop historian, music technologist and founder of the original socially conscious band “Stetsasonic”, Daddy-O is a living hip-hop legend and one of the most influential voices in trending digital media. Hailing from Brooklyn, New York, Daddy-O has conquered the music industry not only as an artist, but as a mogul that helped launch industry heavyweights like Mary J. Blige, Red Hot Chili Peppers, Keith Richards, Sonic Youth, and They Might Be Giants. Building on his success with Stetsasonic, Daddy-O developed into a highly sought-after writer and producer during the 80s and 90s. This is where he began to lay the foundation for his successful career as a music executive and music technologist. Daddy-O has worked for Universal, Def Jam, and Motown Records. He has also discovered talent like Smooth Da’ Hustla, Master P. and Mystikal. Daddy-O has produced music for The B-52s, Mary J. Blige, and Queen Latifah, just to name a few. Daddy-O has deejayed in posh venues from NYC’s Highline Ballroom to Atlanta’s Biltmore. Even at class acts like the Michael C. Carlos Museum.

  In July 2015, Daddy-O returned from a 22 year hiatus to release his latest solo album entitled “#EverybodyButKRS” on Odad Truth Records, a label he co-owns with partner and fellow 730 bandmate Lion Lindwedel.
                    
  Daddy-O releases albums on the Odad Truth label for True School Entertainment with online distribution through SpitDigital and physical Distribution available through www.trueschoolent.com.`,
          created_at: "2019-01-20 12:03:00"
        },
        {
          id: 5,
          name: "Memphis Jelks",
          slug: "memphis-jelks",
          description: `You may have heard of Memphis music legends, Isaac Hayes, Johnny Cash and Elvis Presley. What do they all have in common? Like Memphis Jelks, all of these artists came to stardom in Memphis, TN, but each of them are from the outskirts of Memphis.

Jacoby "Memphis" Jelks, aka J-Smoove, grew up in Lauderdale County (approximately 65 miles north of Memphis) in a small town called Ripley, TN. Over time, he honed his skills as a DJ, music producer and recording artist. Given the name "Memphis" by the legendary Chuck D of the group Public Enemy, Jelks is poised to become a memorable artist in the Hip Hop genre, respectfully.

Known for producing hypnotic beats, i.e. DJ Paul and Juicy J, and his straight to the point rhyme style, Smoove blends soulful hooks and meaningful lyrics to create a nostalgic atmosphere intended to inspire his listeners.

After releasing two studio albums, "Call Me Up" and "The Last Classic" under the Memphis based label Portra Records, J-Smoove went on to release several underground albums as an independent artist under his own record label, dubbed "Ori-G-inO Records". The success of these albums, ultimately lead to Jacoby landing numerous gigs in and around the city of Memphis before gradually meeting Memphis rap legend Al Kapone and crew. The result was Jacoby performing at more upscale venues and events, including the Beale St. Music Festival as a background vocalist for Kapone.

It was during this period that Memphis Jelks had a chance meeting with Chuck D that would change his music career forever. Everyone, please meet Memphis Jelks aka J-Smoove of SpitDigital Recordings.`,
          created_at: "2019-01-20 12:04:00"
        },
        {
          id: 6,
          name: "Rukus Music",
          slug: "rukus-music",
          description: `Dynamic Duo of MC's based out of Detroit delivering authentic Hip Hop Music`,
          created_at: "2019-01-20 12:05:00"
        },
        {
          id: 7,
          name: "Jahi as PE2.0",
          slug: "jahi-pe20",
          description: `Jahi of PE 2.0 Jahi's career began after becoming the first local Cleveland Hip Hop artist to perform at The Rock & Roll Hall of Fame in 1999 as a result of winning a competition. At soundcheck, Jahi met Public Enemy and connected with Chuck D backstage. Jahi went on to release underground solo projects, and also one album, Soulhop The Breakthru, on EMI Denmark to critical acclaim with the Danish supergroup Nobody Beats the Beats in 2006.

Sharing the same stages with Yasiin Bey, Blackalicious, Common, Talib Kweli, The Black Eyed Peas, Jay Z, The Roots, Mary J. Blige, Chuck Brown, Chaka Khan, Floetry, Raheem DeVaughn, Ab­Soul, Dead Prez, Jennifer Johns, Snoop Dogg, Zion I, KRS­One, Outkast, Goodie Mob, Public Enemy and many more as an independent artist provided opportunities for Jahi to find his voice and hone in on his craft. Returning to the states, Jahi reunited with Public Enemy as the official opening act and MC for the 20th Anniversary Tour.

It was here where the seeds were planted for PE 2.0. Strong Songs. Meaningful Movements. Better Mindsets. These are the phrases that capture the focus for this new branch on the iconic tree of PE. Jahi’s task is two­fold. One is to take select songs from the PE catalog and cover them or reVisit them. Two is to create new songs over new production and classic PE­Bomb Squad tracks to bring new consciousness, culture and spirit to Hip Hop worldwide. Backed by a band in Oakland called The Life, and musical collaborations with the original members of Public Enemy like DJ Lord­turntables, Davy DMX on Bass, T­Bone on Drums, and Khari Wynn on guitar, with special guest appearances by Professor Griff and Chuck D, PE 2.0 continues the legacy of PE.

Coming off a great music sharing run with PEople Get Ready, performing with Yasiin Bey, Public Enemy, and KRS­One, PE 2.0 released multiple videos from the album including "Yo," and "What They Need." PE 2.0 now delivers insPirEd, which is simply social commentary over boombap. The lead single "Survival" speaks to the need for people to fight back against tyranny. insPirEd music producers are the legendary Easy Mo Bee and Jam Master Jay, Divided Souls, DJ Pain 1, Chyskilz and many more from the original PE catalogs.

Jahi is also a leader in his community. As a Program Manager for The Office of African American Male Achievement/Oakland Unified School District, the first program in the nation to serve African American boys in a public school district, Jahi manages the Manhood Development program in 16 school sites in Oakland, California.`,
          created_at: "2019-01-20 12:06:00"
        },
        {
          id: 8,
          name: "East Duel West",
          slug: "east-duel-west",
          description: `East Duel West aka EDW is an established two man production and songwriting team, comprised of Sammy Vegas aka Sammy Sam (Public Enemy), and Charlie Mac. The name was given to the group by the legendary Hip Hop icon, Chuck D of Public Enemy. The name represents the two cultures of the team. Sammy Vegas is Korean, which symbolizes the East, and Charlie Mac is American, symbolizing the West.

Combined the pair makes East Duel West! Both are artist with multiple projects constantly in the works. Sammy Vegas has a solo album out, and more on the way. Sammy Vegas is an accomplished songwriter, having worked with YDG, Kilgun, Flavor Flav, Chuck D, Public Enemy, etc. Sammy Vegas is also working on some TV shows, and is the only Asian member of Public Enemy.

Charlie Mac is an accomplished music producer. Chuck D referred to Charlie Mac as a resident Timbaland. Charlie Mac has released several instrumental albums, produced music for various artists, films, games, and produces music for some of the most popular reality shows on TV today. On any given day, his music is being heard by millions.

Together the duo makes up a power house, with endless musical possibilities.`,
          created_at: "2019-01-20 12:07:00"
        },
        {
          id: 9,
          name: "Antwon King",
          slug: "antwon-king",
          description: `
Born in Inglewood and raised in Los Angeles, California Antwon King was born to do music. His mother and father were both avid music lovers and always played music in the house. Soul and R&B tunes blasted from the stereo constantly which made his appreciation for music grow. One day his baby sitter at the time put on a record that would change his life! The record was called “Eric B. is President” and he has been an avid hip hop fanatic ever since. Throughout his life, he has seen his friends join gangs and go to jail for selling drugs. You would think somebody raised in South Central LA would glorify violence and crime like so many other rappers, but Antwon isn’t your ordinary rapper, he decided to take another route. He began writing poetry in school, mainly to get the attention of the girls he had his eye on, but soon those poems became hip hop songs. He cites Rakim, Nas, and Tupac as his greatest influences and his style is a combination of everything and everyone that has inspired him. A God-fearing man who is active in his Church and in his Community, he states “I want my music to inspire people and still make their head nod. I make soul music in every sense of the word with a hip hop twist on it.”

Antwon decided to make his main focus his music, so he dropped out of College to pursue it full time. However, Antwon is much more than just a “rapper” he is also a very talented music producer. He has created most of the beats you hear in his songs as well as created beats and songs for other Artists. In late 2016, Antwon created his own record label called Kings Music Group. His vision is to support other artists like him who want to create motivational and inspirational hip hop music! He has his own studio and is driven to succeed. He will stop at nothing to fulfill his destiny while helping others achieve their dreams in the music business as well.

Antwon King is not new to the music scene, he has been perfecting his craft for 11 years. He has accolades that are very impressive. He is an award winning hip hop artist. In 2006 he won the Southern California Music Award for Best Hip Hop Artist. Also in 2008 he was nominated for 5 Mavric Awards, and he was a featured performer on that awards show. In 2016 he won the “Word on the Street” award for his music at the Ventura County Music Awards. He has been featured on DubCNN.com, Rap Talk.net and various other websites. He was also featured on MTV2 Sucka Free freestyle rap acapella on the streets of Hollywood.

Antwon is very dedicated to helping people and inspiring them through his music…he says “I hope my music helps at least one person and gives them inspiration to keep pushing even when times are rough. It’s a bad time for this Country, this economy and people of all colors”. He states, “I want to be a voice of hope…and still make you dance.” With brand new music on the horizon it seems as if the sky is the limit for this Southern California emcee.

You can find Antwon King performing locally all over Ventura and Los Angeles Counties. It is his goal to expand his reach and build his fan base Nationwide and Worldwide.

When Antwon is not performing he is a devoted husband, and father to 3 beautiful daughters.`,
          created_at: "2019-01-20 12:08:00"
        },
        {
          id: 10,
          name: "Obeah",
          slug: "obeah",
          description: `Obeah has been cutting his teeth for damn near two decades in America’s independent music scene, performing across the country, all the while remaining true to his desire to serve a cause greater than his own. Raised in Columbus, GA and now residing in Atlanta, Adam’s southern influence is undeniable but this Renaissance Man could never be defined by one genre, occupation or geographic region.

In addition to being an Activist, Sommelier, and talented DJ, Obeah’s true passion is opening closed-minds through poetic expression. Inspired by the legends like Chuck D and KRS-One, Obeah uses his lyrical platform to encourage the masses to stop accepting the bullshit status quo.

Some of Obeah’s most notable music projects include, The ContraVerse, Difference Machine, WAKE, and DJ Lord>2muchPossE. He is currently working on his first solo album for SPITdigital recordings.`,
          created_at: "2019-01-20 12:09:00"
        },
        {
          id: 11,
          name: "The Impossebulls",
          slug: "impossebulls",
          description: `In 2000, Chuck D of Public Enemy reached out to some of his fans to collaborate on a song about the oncoming demise of major record labels. That song, "We Don't Need You", also featured Kyle Jason, Professor Griff, and PE fans that came together via the ENEMYBOARD forum on PublicEnemy.com.

The song was recorded in pieces and transmitted digitally using MP3 compression, a first at the time. From there, Chuck commissioned Producer/ Emcee C-Doc (The WarHammer) to put together a group that would continue to record in this fashion.

Thus, The Impossebulls were born.

Over the years, the collaborators have changed, but the core ideals remain the same. Hiphop, truth, no boundaries, no rules. They keep on going, showing up from time to time, either live or on a recording, doing what they do because they love to do it.`,
          created_at: "2019-01-20 12:10:00"
        },
        {
          id: 12,
          name: "Jelani Malik",
          slug: "jelani-malik",
          description: `
A man with a passion to share his story. Jelani Malik was born in Long Island, NY to an aspiring Gospel artist and a member of the Hip Hop greats Public Enemy. Growing up Jelani knew the struggle of depression that thousands of people face today and, like so many, couldn't find the right thing to conquer it. With emotions trapped inside and depression reaching it's high, a pencil and a notebook seemed like the only logical way to release. After finally feeling the freedom from his state of mind, Jelani realized two things: He loves Jesus and knew that his story needed to be shared because it's much bigger than him. Fast forward 6 years and Jelani hasn't looked back. Now 22, a college graduate, and residing in Orlando, FL he looks to use the art of story telling God placed in him to inspire the next generation of creative minds. The road hasn't been perfect but his faith in God and passion to see change in people who suffer from depression and other social injustices keeps him focused. Coming off of his debut album, Graduation Day (2015), Jelani looks to show transparency, inspiration, and his love of Christ through the fused tunes of Soul, R&B, and Hip Hop.`,
          created_at: "2019-01-20 12:11:00"
        }
      ]);
    });
};
