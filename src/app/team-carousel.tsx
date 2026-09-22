'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Globe } from 'lucide-react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type TeamLink = { type: 'instagram' | 'linkedin' | 'site'; url: string };
type TeamMember = { name: string; role: string; image: string; bio?: string; links: TeamLink[] };

interface TeamCarouselProps {
  team: TeamMember[];
}

const teamLinkIcon = { instagram: FaInstagram, linkedin: FaLinkedinIn, site: Globe };
const COLLAPSED_BIO_WORDS = 14;

function TeamBio({ bio }: { bio: string }) {
  const [expanded, setExpanded] = useState(false);
  const words = bio.trim().split(/\s+/);
  const shouldCollapse = words.length > COLLAPSED_BIO_WORDS;
  const preview = shouldCollapse ? `${words.slice(0, COLLAPSED_BIO_WORDS).join(' ')}...` : bio;

  return (
    <div className="team-bio-wrap">
      <p className="team-bio">{expanded || !shouldCollapse ? bio : preview}</p>
      {shouldCollapse && (
        <button
          aria-expanded={expanded}
          className="team-bio-toggle"
          onClick={() => setExpanded((value) => !value)}
          type="button"
        >
          {expanded ? 'ler menos' : 'ler mais'}
        </button>
      )}
    </div>
  );
}

export default function TeamCarousel({ team }: TeamCarouselProps) {
  return (
    <div className="team-swiper-shell">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.team-swiper-button-next',
          prevEl: '.team-swiper-button-prev',
        }}
        pagination={{
          el: '.team-swiper-pagination',
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 14,
          },
          760: {
            slidesPerView: 5,
            spaceBetween: 18,
          },
        }}
        className="team-swiper"
      >
        {team.map((member) => (
          <SwiperSlide key={member.name} className="team-swiper-slide">
            <article className="team-card">
              <Image
                alt={member.name}
                className="team-photo"
                height={400}
                src={encodeURI(member.image)}
                width={300}
                priority={false}
              />
              <div className="team-card-body">
                <h3>{member.name}</h3>
                {member.bio && <TeamBio bio={member.bio} />}
                <p className="team-role">{member.role}</p>
                {member.links.length > 0 && (
                  <div className="team-links">
                    {member.links.map((link, index) => {
                      const Icon = teamLinkIcon[link.type];
                      return (
                        <a
                          aria-label={`${member.name} - ${link.type}`}
                          href={link.url}
                          key={`${member.name}_${link.type}_${index}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Icon aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="team-swiper-arrows" aria-hidden="true">
        <button className="team-swiper-button-prev" aria-label="Slide anterior">
          ←
        </button>
        <button className="team-swiper-button-next" aria-label="Proximo slide">
          →
        </button>
      </div>
      <div className="team-swiper-pagination"></div>
    </div>
  );
}
