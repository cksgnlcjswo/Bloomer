package com.exmaple.flory.service;

import com.exmaple.flory.dto.comment.CommentDto;
import com.exmaple.flory.dto.comment.CommentListDto;
import com.exmaple.flory.dto.diary.DiaryDto;
import com.exmaple.flory.dto.diary.DiaryRequestDto;
import com.exmaple.flory.dto.flower.FlowerEmotionDto;
import com.exmaple.flory.entity.*;
import com.exmaple.flory.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class DiaryService {
    @Autowired
    private EmotionRepository emotionRepository;
    @Autowired
    private FlowerRepository flowerRepository;
    @Autowired
    private GardenRepository gardenRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    DiaryRepository diaryRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CommentService commentService;

    public DiaryDto insertDiary(DiaryRequestDto diaryRequestDto) throws Exception {
        Diary diary = diaryRequestDto.toEntity();
        Optional<Garden> garden = gardenRepository.findById(diaryRequestDto.getGid());
        Optional<Flower> flower = flowerRepository.findById(diaryRequestDto.getFid());

        if(garden.isEmpty() || flower.isEmpty()) throw new Exception();

        Flower flowerData = flower.get();

        diary.setGarden(garden.get());
        diary.setFlower(flowerData);

        DiaryDto result = diaryRepository.save(diary).toDto();
        result.setFlowerEmotion(getFlowerEmotion(flowerData));

        return result;
    }

    public DiaryDto getDiary(Long diaryId) throws Exception {
        Optional<Diary> diary = diaryRepository.findById(diaryId);

        if(diary.isEmpty()){
            throw new Exception();
        }

        DiaryDto result = diary.get().toDto();
        result.setFlowerEmotion(getFlowerEmotion(diary.get().getFlower()));
        result.setCommentList(getCommentList(result));

        return result;
    }

    public int deleteDiary(Long diary_id){
        Optional<Diary> diary = diaryRepository.findById(diary_id);

        if(diary.isPresent()){
            diaryRepository.delete(diary.get());
            return 1;
        }
        else{
            return 0;
        }
    }

    public DiaryDto updateDiary(DiaryDto diaryDto){
        return diaryRepository.save(diaryDto.toEntity()).toDto();
    }

    public List<DiaryDto>getDiaryListGarden(Long gardenId) throws Exception {
        List<Diary> diaryList = diaryRepository.findByGardenId(gardenId);
        List<DiaryDto> diaryDtoList = new ArrayList<>();

        for(int i=0;i<diaryList.size();i++){
            DiaryDto diaryDto = diaryList.get(i).toDto();
            diaryDto.setFlowerEmotion(getFlowerEmotion(diaryList.get(i).getFlower()));
            diaryDto.setCommentList(getCommentList(diaryDto));
            diaryDtoList.add(diaryDto);
        }

        return diaryDtoList;
    }

    public List<DiaryDto> getDiaryListByUser(Long userId) throws Exception {
        List<Diary> diaryList = diaryRepository.findByMemberId(userId);
        List<DiaryDto> diaryDtoList = new ArrayList<>();

        for(int i=0;i<diaryList.size();i++){
            DiaryDto diaryDto = diaryList.get(i).toDto();
            diaryDto.setCommentList(getCommentList(diaryDto));
            diaryDtoList.add(diaryDto);
        }

        return diaryDtoList;
    }

    public DiaryDto getDiaryByLocation(String x, String y, String z) throws Exception {
        DiaryDto diaryDto = diaryRepository.findByXAndYAndZ(x,y,z).toDto();
        List<CommentListDto> comments = commentService.getCommentList(diaryDto.getId());

        diaryDto.setCommentList(comments);

        return diaryDto;
    }

    public List<CommentListDto> getCommentList(DiaryDto diaryDto) throws Exception{
        List<CommentListDto> comments = new ArrayList<>();
        List<Comment> commentList = commentRepository.findByDid(diaryDto.getId());

        for(int i=0;i<commentList.size();i++){
            CommentDto commentDto = commentList.get(i).toDto();
            Optional<Member> member = memberRepository.findById(commentDto.getUid());

            if(member.isEmpty()) throw new Exception();

            commentDto.setMember(member.get());
            CommentListDto commentListDto = CommentListDto.builder()
                    .id(commentDto.getId()).member(commentDto.getMember()).content(commentDto.getContent()).createdTime(commentDto.getCreatedTime()).build();

            comments.add(commentListDto);
        }

        return comments;
    }

    public FlowerEmotionDto getFlowerEmotion(Flower flowerData) throws Exception{
        Long emotionId = flowerRepository.getEmotionKey(flowerData.getId()).get(0);

        Optional<Emotion> emotion = emotionRepository.findById(emotionId);

        if(emotion.isEmpty()) throw new Exception();

        FlowerEmotionDto flowerEmotionDto = FlowerEmotionDto.builder()
                .fid(flowerData.getId()).eid(emotionId).flowerName(flowerData.getName()).language(flowerData.getLanguage())
                .emotion(emotion.get().getType()).build();

        return flowerEmotionDto;
    }
}
