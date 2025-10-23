import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Image } from '@react-pdf/renderer';
import { RESUME_DATA } from '@/data/resume-data';
import enMessages from '@/messages/en';
import deMessages from '@/messages/de';
import arMessages from '@/messages/ar';
import path from 'path';

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
    marginBottom: 20,
    gap: 15,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
    gap: 15,
  },
  headerLeft: {
    flex: 1,
  },
  headerLeftRTL: {
    flex: 1,
    textAlign: 'right',
  },
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 4,
  },
  twoColumnContainerRTL: {
    flexDirection: 'row-reverse',
    gap: 15,
    marginTop: 4,
  },
  infoColumn: {
    flexDirection: 'column',
    gap: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: 'cover',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  location: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: 'column',
    gap: 3,
    marginTop: 4,
    marginBottom: 8,
  },
  contactInfoRTL: {
    flexDirection: 'column',
    gap: 3,
    marginTop: 4,
    marginBottom: 8,
  },
  contactItem: {
    fontSize: 9,
    color: '#0f172a',
  },
  contactLink: {
    fontSize: 9,
    color: '#0f172a',
    textDecoration: 'underline',
  },
  contactLabel: {
    fontSize: 8,
    color: '#0f172a',
    marginRight: 4,
    fontFamily: 'Helvetica-Bold',
  },
  contactLabelRTL: {
    fontSize: 8,
    color: '#0f172a',
    marginLeft: 4,
    fontFamily: 'Helvetica-Bold',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactRowRTL: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  contactIcon: {
    width: 10,
    height: 10,
  },
  personalInfoRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 0,
    flexWrap: 'wrap',
  },
  personalInfoRowRTL: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginTop: 0,
    flexWrap: 'wrap',
  },
  personalInfoItem: {
    fontSize: 8,
    color: '#0f172a',
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
    height: 1.5,
    backgroundColor: '#000000',
  },
  sectionTitleLineLong: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#000000',
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica',
    color: '#1e293b',
    letterSpacing: 0.3,
    fontWeight: 600,
  },
  sectionTitleRTL: {
    fontSize: 13,
    fontFamily: 'Helvetica',
    color: '#1e293b',
    letterSpacing: 0.3,
    fontWeight: 600,
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
    textDecoration: 'none',
  },
  itemSubtitle: {
    fontSize: 9.5,
    color: '#475569',
    marginTop: 2,
    fontStyle: 'italic',
  },
  itemDate: {
    fontSize: 8.5,
    color: '#64748b',
    fontStyle: 'italic',
  },
  // Work experience specific styles
  workHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  workHeaderRTL: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  workTitleColumn: {
    flexDirection: 'column',
    gap: 2,
  },
  workTitleColumnRTL: {
    flexDirection: 'column',
    gap: 2,
    alignItems: 'flex-end',
  },
  workCompany: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  workTitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#475569',
  },
  // Recognition specific styles
  recognitionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  recognitionHeaderRTL: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  recognitionTitleColumn: {
    flexDirection: 'column',
    gap: 2,
  },
  recognitionTitleColumnRTL: {
    flexDirection: 'column',
    gap: 2,
    alignItems: 'flex-end',
  },
  recognitionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  recognitionOrganization: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#475569',
  },
  recognitionType: {
    fontSize: 8.5,
    color: '#64748b',
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.5,
    marginTop: 4,
    textAlign: 'justify',
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
    fontSize: 8.5,
    color: '#64748b',
    marginTop: 2,
    fontStyle: 'italic',
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

export const createCVDocument = (locale: Locale = 'en') => {
  const messages = messagesMap[locale];
  const isRTL = locale === 'ar';

  // Get absolute paths for icons
  const publicDir = path.join(process.cwd(), 'public');
  const emailIcon = path.join(publicDir, 'icons', 'email.png');
  const phoneIcon = path.join(publicDir, 'icons', 'phone.png');
  const githubIcon = path.join(publicDir, 'icons', 'github.png');
  const linkedinIcon = path.join(publicDir, 'icons', 'linkedin.png');
  const calendarIcon = path.join(publicDir, 'icons', 'calendar.png');
  const homeIcon = path.join(publicDir, 'icons', 'home.png');
  const flagIcon = path.join(publicDir, 'icons', 'flag.png');
  const heartIcon = path.join(publicDir, 'icons', 'heart.png');

  return (
    <Document>
      <Page size="A4" style={isRTL ? styles.pageRTL : styles.page}>
        {/* Header */}
        <View style={isRTL ? styles.headerRTL : styles.header}>
          {/* Left side - Name and Location */}
          <View style={isRTL ? styles.headerLeftRTL : styles.headerLeft}>
            <Text style={styles.name}>{messages.name}</Text>
            <Text style={styles.location}>{messages.location}</Text>

            {/* Two Column Layout for Contact and Personal Info */}
            <View style={isRTL ? styles.twoColumnContainerRTL : styles.twoColumnContainer}>
              {/* Contact Information Column */}
              <View style={styles.infoColumn}>
                {RESUME_DATA.contact.email && (
                  <View style={isRTL ? styles.contactRowRTL : styles.contactRow}>
                    <Image src={emailIcon} style={styles.contactIcon} />
                    <Link src={`mailto:${RESUME_DATA.contact.email}`} style={styles.contactLink}>
                      {RESUME_DATA.contact.email}
                    </Link>
                  </View>
                )}
                {RESUME_DATA.contact.tel && (
                  <View style={isRTL ? styles.contactRowRTL : styles.contactRow}>
                    <Image src={phoneIcon} style={styles.contactIcon} />
                    <Link src={`tel:${RESUME_DATA.contact.tel}`} style={styles.contactLink}>
                      {RESUME_DATA.contact.tel}
                    </Link>
                  </View>
                )}
                {RESUME_DATA.contact.social.map((social) => {
                  const iconSrc = social.name === 'GitHub' ? githubIcon : linkedinIcon;
                  return (
                    <View key={social.name} style={isRTL ? styles.contactRowRTL : styles.contactRow}>
                      <Image src={iconSrc} style={styles.contactIcon} />
                      <Link src={social.url} style={styles.contactLink}>
                        {social.name}
                      </Link>
                    </View>
                  );
                })}
              </View>

              {/* Personal Information Column */}
              <View style={styles.infoColumn}>
                <View style={isRTL ? styles.contactRowRTL : styles.contactRow}>
                  <Image src={calendarIcon} style={styles.contactIcon} />
                  <Text style={styles.personalInfoItem}>
                    {messages.personalInfo.values.dateOfBirth}
                  </Text>
                </View>
                <View style={isRTL ? styles.contactRowRTL : styles.contactRow}>
                  <Image src={homeIcon} style={styles.contactIcon} />
                  <Text style={styles.personalInfoItem}>
                    {messages.personalInfo.values.placeOfBirth}
                  </Text>
                </View>
                <View style={isRTL ? styles.contactRowRTL : styles.contactRow}>
                  <Image src={flagIcon} style={styles.contactIcon} />
                  <Text style={styles.personalInfoItem}>
                    {messages.personalInfo.values.nationality}
                  </Text>
                </View>
                <View style={isRTL ? styles.contactRowRTL : styles.contactRow}>
                  <Image src={heartIcon} style={styles.contactIcon} />
                  <Text style={styles.personalInfoItem}>
                    {messages.personalInfo.values.maritalStatus}
                  </Text>
                </View>
              </View>
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
                <View style={isRTL ? styles.workHeaderRTL : styles.workHeader}>
                  <View style={isRTL ? styles.workTitleColumnRTL : styles.workTitleColumn}>
                    <Text style={styles.workCompany}>{resumeWork.company}</Text>
                    <Text style={styles.workTitle}>{work.title}</Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {resumeWork.start} – {resumeWork.end ?? 'Present'}
                  </Text>
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
                <View style={isRTL ? styles.recognitionHeaderRTL : styles.recognitionHeader}>
                  <View style={isRTL ? styles.recognitionTitleColumnRTL : styles.recognitionTitleColumn}>
                    <Text style={styles.recognitionTitle}>{recognition.title}</Text>
                    <Text style={styles.recognitionOrganization}>{recognition.organization}</Text>
                  </View>
                  <Text style={styles.itemDate}>{resumeRecognition.date}</Text>
                </View>
                <Text style={styles.recognitionType}>{recognition.type}</Text>
                <Text style={styles.itemDescription}>{recognition.description}</Text>
              </View>
            );
          })}
        </View>

        {/* Skills */}
        <View style={styles.section} break>
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
                <Text style={styles.projectTech}>
                  {resumeProject.techStack.join(' • ')}
                </Text>
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
