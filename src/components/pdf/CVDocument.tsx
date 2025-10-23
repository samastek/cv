import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link, Image } from '@react-pdf/renderer';
import { RESUME_DATA } from '@/data/resume-data';
import enMessages from '@/messages/en';
import deMessages from '@/messages/de';
import arMessages from '@/messages/ar';

// Type for locale
type Locale = 'en' | 'de' | 'ar';

// Messages map
const messagesMap = {
  en: enMessages,
  de: deMessages,
  ar: arMessages,
};

// Define comprehensive styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: '0.75in',
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  pageRTL: {
    padding: '0.75in',
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    textAlign: 'right',
  },
  // Header section
  header: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 12,
    gap: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cbd5e1',
  },
  headerRTL: {
    flexDirection: 'row-reverse',
    marginBottom: 15,
    paddingBottom: 12,
    gap: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cbd5e1',
  },
  headerLeft: {
    flex: 1,
  },
  headerLeftRTL: {
    flex: 1,
    textAlign: 'right',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 4,
    objectFit: 'cover',
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  about: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 0,
    lineHeight: 1.3,
  },
  location: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 6,
    marginTop: 6,
  },
  contactInfo: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  contactInfoRTL: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  contactItem: {
    fontSize: 9,
    color: '#64748b',
  },
  personalInfoRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  personalInfoRowRTL: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  personalInfoItem: {
    fontSize: 8,
    color: '#64748b',
  },
  // Section styles
  section: {
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  sectionTitleContainerRTL: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  sectionTitleLineShort: {
    width: 30,
    height: 0.5,
    backgroundColor: '#cbd5e1',
  },
  sectionTitleLineLong: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#cbd5e1',
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionTitleRTL: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'right',
  },
  // Work/Education item
  item: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  itemHeaderRTL: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  itemSubtitle: {
    fontSize: 9.5,
    color: '#475569',
    marginTop: 2,
    marginBottom: 3,
    fontStyle: 'italic',
  },
  itemDate: {
    fontSize: 8.5,
    color: '#64748b',
  },
  itemDescription: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.5,
    marginTop: 3,
    textAlign: 'justify',
  },
  badges: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
    marginBottom: 3,
    flexWrap: 'wrap',
  },
  badgesRTL: {
    flexDirection: 'row-reverse',
    gap: 5,
    marginTop: 5,
    marginBottom: 3,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: 2,
    fontSize: 7.5,
    color: '#64748b',
  },
  // Skills
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillsGridRTL: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillItem: {
    fontSize: 8.5,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
    color: '#334155',
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
  },
  // Projects
  projectCard: {
    marginBottom: 8,
    padding: 0,
    backgroundColor: 'transparent',
  },
  projectTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.5,
    marginBottom: 4,
    textAlign: 'justify',
  },
  projectTech: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
  },
  projectTechRTL: {
    flexDirection: 'row-reverse',
    gap: 4,
    flexWrap: 'wrap',
  },
  techBadge: {
    fontSize: 7,
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
  },
  // Interests
  interestsList: {
    marginTop: 4,
  },
  interestItem: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.4,
    marginBottom: 3,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 54,
    right: 54,
    textAlign: 'center',
    fontSize: 7.5,
    color: '#94a3b8',
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#e2e8f0',
  },
  link: {
    color: '#64748b',
    textDecoration: 'none',
  },
});

interface CVDocumentProps {
  locale?: Locale;
}

export const CVDocument: React.FC<CVDocumentProps> = ({ locale = 'en' }) => {
  const messages = messagesMap[locale];
  const isRTL = locale === 'ar';

  return (
    <Document>
      <Page size="A4" style={isRTL ? styles.pageRTL : styles.page}>
        {/* Header */}
        <View style={isRTL ? styles.headerRTL : styles.header}>
          {/* Left side - Info */}
          <View style={isRTL ? styles.headerLeftRTL : styles.headerLeft}>
            <Text style={styles.name}>{messages.name}</Text>
            <Text style={styles.about}>{messages.about}</Text>
            <Text style={styles.location}>{messages.location}</Text>

            {/* Contact Information */}
            <View style={isRTL ? styles.contactInfoRTL : styles.contactInfo}>
              {RESUME_DATA.contact.email && (
                <Link src={`mailto:${RESUME_DATA.contact.email}`} style={styles.contactItem}>
                  {RESUME_DATA.contact.email}
                </Link>
              )}
              {RESUME_DATA.contact.tel && (
                <Link src={`tel:${RESUME_DATA.contact.tel}`} style={styles.contactItem}>
                  {RESUME_DATA.contact.tel}
                </Link>
              )}
              {RESUME_DATA.contact.social.map((social) => (
                <Link key={social.name} src={social.url} style={styles.contactItem}>
                  {social.name}
                </Link>
              ))}
            </View>

            {/* Personal Information */}
            <View style={isRTL ? styles.personalInfoRowRTL : styles.personalInfoRow}>
              <Text style={styles.personalInfoItem}>
                {messages.personalInfo.dateOfBirth}: {messages.personalInfo.values.dateOfBirth}
              </Text>
              <Text style={styles.personalInfoItem}>
                {messages.personalInfo.placeOfBirth}: {messages.personalInfo.values.placeOfBirth}
              </Text>
              <Text style={styles.personalInfoItem}>
                {messages.personalInfo.nationality}: {messages.personalInfo.values.nationality}
              </Text>
              <Text style={styles.personalInfoItem}>
                {messages.personalInfo.maritalStatus}: {messages.personalInfo.values.maritalStatus}
              </Text>
            </View>
          </View>

          {/* Right side - Avatar */}
          <Image src={RESUME_DATA.avatarUrl} style={styles.avatar} />
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <View style={isRTL ? styles.sectionTitleContainerRTL : styles.sectionTitleContainer}>
            <View style={styles.sectionTitleLineShort} />
            <Text style={isRTL ? styles.sectionTitleRTL : styles.sectionTitle}>
              {messages.sections.workExperience}
            </Text>
            <View style={styles.sectionTitleLineLong} />
          </View>
          {Object.entries(messages.work).map(([key, work]) => {
            const resumeWork = RESUME_DATA.work.find((w) =>
              w.company.toLowerCase().includes(key === 'siemens' ? 'siemens' : 'adorsys')
            );
            if (!resumeWork) return null;

            return (
              <View key={key} style={styles.item}>
                <View style={isRTL ? styles.itemHeaderRTL : styles.itemHeader}>
                  <View style={{ flex: 1 }}>
                    <Link src={resumeWork.link} style={styles.itemTitle}>
                      {resumeWork.company}
                    </Link>
                    <Text style={styles.itemSubtitle}>{work.title}</Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {resumeWork.start} - {resumeWork.end ?? 'Present'}
                  </Text>
                </View>
                <View style={isRTL ? styles.badgesRTL : styles.badges}>
                  {resumeWork.badges.map((badge) => (
                    <Text key={badge} style={styles.badge}>
                      {badge}
                    </Text>
                  ))}
                </View>
                <Text style={styles.itemDescription}>{work.description}</Text>
              </View>
            );
          })}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <View style={isRTL ? styles.sectionTitleContainerRTL : styles.sectionTitleContainer}>
            <View style={styles.sectionTitleLineShort} />
            <Text style={isRTL ? styles.sectionTitleRTL : styles.sectionTitle}>
              {messages.sections.education}
            </Text>
            <View style={styles.sectionTitleLineLong} />
          </View>
          {Object.entries(messages.education).map(([key, education]) => {
            const resumeEducation = RESUME_DATA.education.find((e) =>
              key === 'university'
                ? e.school.toLowerCase().includes('technische')
                : key === 'abitur'
                ? e.degree.toLowerCase().includes('abitur')
                : false
            );
            if (!resumeEducation) return null;

            return (
              <View key={key} style={styles.item}>
                <View style={isRTL ? styles.itemHeaderRTL : styles.itemHeader}>
                  <Text style={styles.itemTitle}>{education.school}</Text>
                  <Text style={styles.itemDate}>
                    {resumeEducation.start} - {resumeEducation.end}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{education.degree}</Text>
                {education.description && (
                  <Text style={styles.itemDescription}>{education.description}</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Recognitions & Awards */}
        <View style={styles.section}>
          <View style={isRTL ? styles.sectionTitleContainerRTL : styles.sectionTitleContainer}>
            <View style={styles.sectionTitleLineShort} />
            <Text style={isRTL ? styles.sectionTitleRTL : styles.sectionTitle}>
              {messages.sections.recognitions}
            </Text>
            <View style={styles.sectionTitleLineLong} />
          </View>
          {Object.entries(messages.recognitions).map(([key, recognition]) => {
            const resumeRecognition = RESUME_DATA.recognitions.find((r) =>
              key === 'scholarship'
                ? r.title.toLowerCase().includes('scholarship')
                : key === 'sponsorship'
                ? r.title.toLowerCase().includes('sponsorship')
                : key === 'excellence'
                ? r.title.toLowerCase().includes('excellent')
                : false
            );
            if (!resumeRecognition) return null;

            return (
              <View key={key} style={styles.item}>
                <View style={isRTL ? styles.itemHeaderRTL : styles.itemHeader}>
                  <Text style={styles.itemTitle}>{recognition.title}</Text>
                  <Text style={styles.itemDate}>{resumeRecognition.date}</Text>
                </View>
                <Text style={styles.itemDescription}>
                  {recognition.organization} • {recognition.type}
                </Text>
                <Text style={styles.itemDescription}>{recognition.description}</Text>
              </View>
            );
          })}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <View style={isRTL ? styles.sectionTitleContainerRTL : styles.sectionTitleContainer}>
            <View style={styles.sectionTitleLineShort} />
            <Text style={isRTL ? styles.sectionTitleRTL : styles.sectionTitle}>
              {messages.sections.skills}
            </Text>
            <View style={styles.sectionTitleLineLong} />
          </View>
          <View style={isRTL ? styles.skillsGridRTL : styles.skillsGrid}>
            {RESUME_DATA.skills.map((skill) => (
              <Text key={skill.name} style={styles.skillItem}>
                {skill.name}
              </Text>
            ))}
          </View>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <View style={isRTL ? styles.sectionTitleContainerRTL : styles.sectionTitleContainer}>
            <View style={styles.sectionTitleLineShort} />
            <Text style={isRTL ? styles.sectionTitleRTL : styles.sectionTitle}>
              {messages.sections.interests}
            </Text>
            <View style={styles.sectionTitleLineLong} />
          </View>
          <View style={styles.interestsList}>
            {messages.interestsList.map((interest, index) => (
              <Text key={index} style={styles.interestItem}>
                • {interest}
              </Text>
            ))}
          </View>
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <View style={isRTL ? styles.sectionTitleContainerRTL : styles.sectionTitleContainer}>
            <View style={styles.sectionTitleLineShort} />
            <Text style={isRTL ? styles.sectionTitleRTL : styles.sectionTitle}>
              {messages.sections.projects}
            </Text>
            <View style={styles.sectionTitleLineLong} />
          </View>
          {Object.entries(messages.projects).map(([key, project]) => {
            const resumeProject = RESUME_DATA.projects.find((p) =>
              key === 'iot'
                ? p.title.toLowerCase().includes('iot')
                : key === 'financial'
                ? p.title.toLowerCase().includes('financial')
                : key === 'dualStudy'
                ? p.title.toLowerCase().includes('dual')
                : key === 'portfolio'
                ? p.title.toLowerCase().includes('portfolio')
                : false
            );
            if (!resumeProject) return null;

            return (
              <View key={key} style={styles.projectCard}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <View style={isRTL ? styles.projectTechRTL : styles.projectTech}>
                  {resumeProject.techStack.map((tech) => (
                    <Text key={tech} style={styles.techBadge}>
                      {tech}
                    </Text>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            {messages.name} • Generated on {new Date().toLocaleDateString(locale)} • Built with Next.js
          </Text>
        </View>
      </Page>
    </Document>
  );
};
