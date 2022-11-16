package com.a401.backend.domain.member.application;

import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.member.dto.MemberModifyRequestDto;
import com.a401.backend.domain.member.dto.ResignRequestDto;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.a401.backend.global.exception.ResourceNotFoundException;
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
    public boolean modifyUser(MemberModifyRequestDto request, Member member) {
        Member newMember = memberRepository.findById(member.getId()).orElse(null);
        try {
            if (request.isEmailNotNull()) {
                newMember.setEmail(request.getEmail());
            }
            if (request.isMemberNameNotNull()) {
                newMember.setMemberName(request.getMemberName());
            }
            if (request.isIntroduceNotNull()) {
                newMember.setIntroduce(request.getIntroduce());
            }
            memberRepository.save(newMember);
            return true;
        } catch (Exception e) {
            System.out.println("modify err occurred!");
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public void resignUser(ResignRequestDto request, Member member) {
        member.setActive(false);
        memberRepository.save(member);
    }

    @Override
    public Member findMemberByProviderId(String id) {
        return memberRepository.findByProviderId(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("User", "id", id));
    }

    @Override
    public Member findMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmailAndIsActiveTrue(email);
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
