'use client';

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
              <div className="team-card-body" style={{ minHeight: '300px' }}>
                <h3>{member.name}</h3>
                {member.bio && <p className="team-bio">{member.bio}</p>}
                <p>{member.role}</p>
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
