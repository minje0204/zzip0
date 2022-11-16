package com.a401.backend.domain.member.application;

import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.member.dto.MemberRequestDto;
import com.a401.backend.domain.member.dto.ResignRequestDto;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final MemberRepository memberRepository;
    private final AmazonS3Client amazonS3Client;

    @Override
    public boolean modifyUser(MemberRequestDto request, Member member) {
        Optional<Member> requestedMember = memberRepository.findByEmail(request.getEmail());
        if (member.getId() == requestedMember.get().getId()) {
            Member newMember = Member.builder()
                    .id(member.getId())
                    .createDate(member.getCreateDate())
                    .email(member.getEmail())
                    .isActive(member.isActive())
                    .membername(request.getMembername())
                    .provider(member.getProvider())
                    .providerId(member.getProviderId())
                    .roles(member.getRoles())
                    .profileImage(request.getProfileImage())
                    .build();

            memberRepository.save(newMember);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void resignUser(ResignRequestDto request, Member member) {
        Member newMember = Member.builder()
                .id(member.getId())
                .createDate(member.getCreateDate())
                .email(member.getEmail())
                .isActive(request.isActive())
                .membername(member.getMembername())
                .provider(member.getProvider())
                .providerId(member.getProviderId())
                .roles(member.getRoles())
                .profileImage(member.getProfileImage())
                .build();

        memberRepository.save(newMember);
    }

    @Override
    public Member findMember(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.orElse(null);
    }

    @Override
    public String s3Upload(MultipartFile multipartFile) {
        File convertFile = new File(System.getProperty("user.dir") + "/"
                + multipartFile.getOriginalFilename());

        try {
            convertFile.createNewFile();
            FileOutputStream fos = new FileOutputStream(convertFile);
            fos.write(multipartFile.getBytes());

            File uploadFile = convertFile;

            // S3에 저장된 파일 이름
            String fileName = "profile" + "/" + UUID.randomUUID() + uploadFile.getName();

            amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                    .withCannedAcl(CannedAccessControlList.PublicRead));

            // s3로 업로드
            String uploadImageUrl = amazonS3Client.getUrl(bucket, fileName).toString();
            
            return uploadImageUrl;
        } catch (IOException e) {
            return null;
        }
    }
}
